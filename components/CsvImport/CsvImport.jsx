import { useState } from "react";
import styled from "styled-components";
import Papa from "papaparse";
import { mutate } from "swr";
import InformationModal from "../InformationModal/InformationModal";

const CSV_REQUIREMENTS =
  "CSV files must have two columns and a header with the first column reading 'question' and the second 'answer'. They must follow RFC4180 standard. Rows must be separated by line breaks. Columns must be separated by commas. Cells containing a comma in text must be wrapped in quotation marks.";

export default function CsvImport({ collections }) {
  const [showImportPanel, setShowImportPanel] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const [csvError, setCsvError] = useState(null);
  const [dbError, setDbError] = useState(null);

  function handleTogglePanel() {
    setShowImportPanel(!showImportPanel);
  }

  function handleToggleInfoModal() {
    setShowInfoModal(!showInfoModal);
  }

  async function handleFileChange(event) {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        if (results.errors.length > 0) {
          setCsvError("Unable to parse CSV file.");
          setParsedData([]);
          return;
        }

        if (results.data.length === 0) {
          setCsvError("No data found in this file.");
          setParsedData([]);
          return;
        }

        if (results.meta.fields.length > 2) {
          setCsvError("Too many columns in this file.");
          setParsedData([]);
          return;
        }

        if (
          results.meta.fields[0] !== "question" ||
          results.meta.fields[1] !== "answer"
        ) {
          setCsvError(
            "Wrong header: first row must read 'question' in first column and 'answer' in second."
          );
          setParsedData([]);
          return;
        }

        const rows = results.data;

        const invalid = rows.filter(
          (row) => row.question?.trim() === "" || row.answer?.trim() === ""
        );
        if (invalid.length > 0) {
          setCsvError(
            `${invalid.length} rows are empty, please check csv file`
          );
          setParsedData([]);
          return;
        }

        setCsvError(null);
        setParsedData(rows);
      },
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setDbError(null);

    const documents = parsedData.map((document) => ({
      collection_id: event.target.collection_id.value,
      question: document.question,
      answer: document.answer,
    }));

    console.log(documents);

    try {
      const response = await fetch("/api/flashcards/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(documents),
      });

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.error || "Unable to save flashcard");
      }

      if (response.ok) {
        await mutate("/api/flashcards");
        await mutate("/api/flashcards?due=true");
        event.target.reset();
        setParsedData([]);
      }
    } catch (error) {
      setDbError(error.message);
    }
  }

  return (
    <CsvImportContainer $padding={showImportPanel}>
      {showInfoModal && (
        <InformationModal
          onClose={handleToggleInfoModal}
          text={CSV_REQUIREMENTS}
        />
      )}
      {!showImportPanel && (
        <OpenPanelButton onClick={handleTogglePanel}>
          Import CSV
        </OpenPanelButton>
      )}
      {showImportPanel && (
        <CsvImportForm onSubmit={handleSubmit}>
          <FileInput type="file" accept=".csv" onChange={handleFileChange} />
          <InfoModalButton type="button" onClick={handleToggleInfoModal}>
            Requirements for CSV files
          </InfoModalButton>
          {csvError && <p>{csvError}</p>}
          <StyledSelect
            name="collection_id"
            id="collection"
            defaultValue=""
            required
          >
            <option value="">-- Please select an option --</option>
            {collections?.map((collection) => (
              <option value={collection._id} key={collection._id}>
                {collection.collectionTitle}
              </option>
            ))}
          </StyledSelect>
          {dbError && <p>{dbError}</p>}
          <div>
            <SubmitButton type="submit" disabled={parsedData.length === 0}>
              Submit
            </SubmitButton>
            <CancelButton onClick={handleTogglePanel}>Cancel</CancelButton>
          </div>
        </CsvImportForm>
      )}
    </CsvImportContainer>
  );
}

const CsvImportContainer = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
`;

const OpenPanelButton = styled.button`
  font-family: inherit;
  font-size: inherit;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #5f5fd2;
  color: white;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const CsvImportForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FileInput = styled.input`
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  padding: 16px 16px;
  border-radius: 8px;
  background-color: #5f5fd2;
  color: white;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const StyledSelect = styled.select`
  width: 80%;
  font-family: inherit;
  font-size: inherit;
  padding: 8px;
  margin-bottom: 32px;
  border-radius: 8px;
`;

const InfoModalButton = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  margin: 8px 0 16px 0;
  &:hover {
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`
  font-family: inherit;
  font-size: inherit;
  padding: 8px 16px;
  margin-right: 16px;
  border-radius: 8px;
  background-color: #5f5fd2;
  color: white;
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const CancelButton = styled.button`
  font-family: inherit;
  font-size: inherit;
  padding: 8px 16px;
  border-radius: 8px;
  background: none;
  color: #5f5fd2;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
