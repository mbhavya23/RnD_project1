import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/layout.css";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";

export default function Generate() {
  const [prompt, setPrompt] = useState("");
  // const [files, setFiles] = useState([]); // multiple files
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { setGenerateText, setTranslatedText } = useAppContext();
  const location = useLocation();

  //   useEffect(() => {
  //   if (category) {
  //     setPrompt(`Generate content related to ${category.replace("-", " ")}`);
  //   }
  // }, [category]);
  useEffect(() => {
    if (location.state?.prefilledPrompt) {
      setPrompt(location.state.prefilledPrompt);
      setTranslatedText(""); // reset old translation (important)
    }
  }, [location.state, setTranslatedText]);


  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      // const formData = new FormData();
      // formData.append("prompt", prompt);
      // files.forEach((file) => {
      //   formData.append("documents", file);
      // });

      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (res.ok) {
      setOutput(data.output);
      setGenerateText(data.output);
    } else {
      alert(data?.error || `Request failed (${res.status})`);
    }
  } catch (err) {
    alert("Server error");
  } finally {
    setLoading(false);
  }
  };

  // const handleFileUpload = (event) => {
  //   const newFiles = Array.from(event.target.files);
  //   setFiles((prev) => [...prev, ...newFiles]);
  // };

  // const removeFile = (index) => {
  //   setFiles((prev) => prev.filter((_, i) => i !== index));
  // };

  return (
    <>
      <Navbar />

      <div className="page" style={{ padding: 0 }}>
        <div className="generate-layout">
          
          {/* LEFT PANEL (1/3) */}
          <div className="generate-left">
            <h3 style={{ marginBottom: 12 }}>
              {category ? "Enter Prompt" : "Enter Prompt"}
            </h3>

            <textarea
              className="prompt-textarea"
              rows={12}
              placeholder="Describe what you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button
              className="button"
              onClick={handleGenerate}
              disabled={loading}
              style={{ marginTop: 16 }}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>

          {/* RIGHT PANEL (2/3) */}
          <div className="generate-right">
            <div className="panel-header">
              <h3>Generated Output</h3>
            </div>
            {output ? (
              <pre className="output-pre">{output}</pre>
            ) : (
              <div className="output-placeholder">
                Generated text will appear here
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
