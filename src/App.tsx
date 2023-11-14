import "bootstrap/dist/css/bootstrap-grid.min.css";
import "./App.css";
import { useStore } from "./hooks/useStore";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { ArrowsIcon } from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { AUTO_LANGUAGE } from "./constants";
import { SectionType } from "./types.d";
import { TextArea } from "./textArea";
import {useEffect} from 'react'
import { translate } from "./services/translate";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  } = useStore();

  const debouncedText = useDebounce(fromText, 200);

  // useEffect (()=>{
  //   if(debouncedText === '') return 
  //   translate({fromLanguage, toLanguage, text: debouncedText})
  //   .then(result => {
  //     if(result == null) return
  //     setResult(result)
  //   })
  //   .catch (()=>{
  //     setResult('Error')})
  // }, [debouncedText, fromLanguage, toLanguage])


  return (
    <div className="App">
      <Container fluid>
        <h1>Google Translate</h1>
        <Row>
          <Col>
            <Stack gap={2}>
              <h2>From</h2>
              <LanguageSelector
                type={SectionType.From}
                value={fromLanguage}
                onChange={setFromLanguage}
              />
              <TextArea
                type={SectionType.From}
                value={fromText}
                onChange={setFromText}
              />
            </Stack>
          </Col>
          <Col>
            <button
              disabled={fromLanguage === AUTO_LANGUAGE}
              onClick={interchangeLanguages}
            >
              <ArrowsIcon />
            </button>
          </Col>
          <Col>
            <Stack gap={2}>
              <h2>To</h2>
              <LanguageSelector
                type={SectionType.To}
                value={toLanguage}
                onChange={setToLanguage}
              />
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
