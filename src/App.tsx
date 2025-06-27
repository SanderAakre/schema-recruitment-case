import { useEffect, useState } from "react";

// MUI components
import { Container, CircularProgress, Alert } from "@mui/material";

// Types/interfaces
import type { SchemaData } from "./types";

// Custom components
import SchemaForm from "./modules/SchemaForm";

function App() {
  const [schema, setSchema] = useState<SchemaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}schemas/schemaData.json`)
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
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: { xs: 1, sm: 2 }, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: { xs: 1, sm: 2 } }}>
        <Alert severity="error">Failed to load schema: {error}</Alert>
      </Container>
    );
  }

  if (!schema) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 1, sm: 2 } }}>
      <SchemaForm schema={schema} />
    </Container>
  );
}

export default App;
