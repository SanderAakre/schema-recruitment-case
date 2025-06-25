import { useEffect, useState } from "react";

// MUI components
import { Container, CircularProgress, Alert } from "@mui/material";

// Development data placeholder
import schemaData from "../public/data/schemaData";

// Types/interfaces
import type { SchemaData } from "./types";

// Custom components
import SchemaForm from "./modules/SchemaForm";

function App() {
  const usePlaceholderData = true; // Set to true to use data from schemaData.ts, which is easier for development

  const [schema, setSchema] = useState<SchemaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!usePlaceholderData) {
      fetch("/data/schemaData.json")
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data: SchemaData) => {
          setSchema(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        });
    } else {
      // Use placeholder data for development
      setSchema(schemaData);
      setLoading(false);
    }
  }, [usePlaceholderData]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">Failed to load schema: {error}</Alert>
      </Container>
    );
  }

  if (!schema) {
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <SchemaForm schema={schema} />
    </Container>
  );
}

export default App;
