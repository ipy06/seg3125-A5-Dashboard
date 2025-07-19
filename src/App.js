import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import DelayBarChart from './components/DelayBarChart';
import DelayLineChart from './components/DelayLineChart';
import { airlineDelayData, monthlyDelayData } from './data';
import { translations } from './translations';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [language, setLanguage] = useState('en');
    const [selectedAirline, setSelectedAirline] = useState('all');
    const [theme, setTheme] = useState('light');

    const currentTranslations = translations[language];

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'fr' : 'en');
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={`themed-container theme-${theme}`}>
            <Container style={{ maxWidth: '1200px', padding: '2rem' }}>
                <Row>
                    <Col>
                        <div className="d-flex justify-content-between align-items-center mb-5">
                            <div>
                                <h1 className="display-4 fw-bold mb-2" style={{ letterSpacing: '0.5px' }}>
                                    {currentTranslations.title}
                                </h1>
                                <p className="lead themed-text-secondary">{currentTranslations.subtitle}</p>
                            </div>
                            <div className="d-flex gap-2">
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={toggleTheme}
                                    title="Toggle Dark Mode"
                                    className="hover-effect"
                                >
                                    <i className={`bi ${theme === 'light' ? 'bi-moon' : 'bi-brightness-high'}`}></i>
                                </Button>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={toggleLanguage}
                                    className="d-flex align-items-center gap-2 hover-effect"
                                >
                                    <i className="bi bi-globe"></i> {currentTranslations.languageToggle}
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col md={6}>
                        <Card className="shadow-sm themed-card hover-card">
                            <Card.Body>
                                <Form.Label className="fw-semibold mb-2">
                                    {currentTranslations.selectAirline}
                                </Form.Label>
                                <Form.Select
                                    value={selectedAirline}
                                    onChange={(e) => setSelectedAirline(e.target.value)}
                                    className="themed-card hover-select"
                                >
                                    <option value="all">{currentTranslations.allAirlines}</option>
                                    {airlineDelayData.map(item => (
                                        <option key={item.airline} value={item.airline}>
                                            {item.airline}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col lg={6}>
                        <Card className="shadow-sm h-100 themed-card hover-card">
                            <Card.Body className="p-4">
                                <h5 className="fw-bold text-center mb-4">
                                    {currentTranslations.barChartTitle}
                                </h5>
                                <DelayBarChart
                                    data={airlineDelayData}
                                    translations={currentTranslations}
                                    selectedAirline={selectedAirline}
                                    theme={theme}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card className="shadow-sm h-100 themed-card hover-card">
                            <Card.Body className="p-4">
                                <h5 className="fw-bold text-center mb-4">
                                    {currentTranslations.lineChartTitle}
                                </h5>
                                <DelayLineChart
                                    data={monthlyDelayData}
                                    translations={currentTranslations}
                                    language={language}
                                    theme={theme}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col>
                        <div className="text-center">
                            <small className="themed-text-secondary fst-italic">
                                {currentTranslations.footerDisclaimer}
                            </small>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
