import React, { useState } from 'react';
import Majax from 'react-mathjax';
import { inputGroupStyle } from './../../common/styles';
import { changeValue, setRes, mathjaxNode, containsErrorValue, setErrorValue } from './../../common/example';
import { Card, CardBody, CardHeader, CardSubtitle, CardText, Alert, Row, Col, InputGroupText, Input, InputGroupAddon, InputGroup, CardFooter, Button } from 'reactstrap';

const Example2 = () => {
    const [isError, setIsError] = useState(false);

    const [p, setP] = useState(0);
    const [pInpt, setPInpt] = useState(0);

    const [fi1, setFi1] = useState(0);
    const [fi1Inpt, setFi1Inpt] = useState(0);

    const [fi2, setFi2] = useState(0);
    const [fi2Inpt, setFi2Inpt] = useState(0);

    const [tanFi1, setTanFi1] = useState(0);
    const [tanFi2, setTanFi2] = useState(0);
    const [qc, setQc] = useState(0);

    const resolve = () => {
        setIsError(false);

        let tanFi1Res = Math.tan(fi1Inpt);
        let tanFi2Res = Math.tan(fi2Inpt);
        let qcRes = pInpt * (tanFi1Res - tanFi2Res);

        if (containsErrorValue(tanFi1Res, tanFi2Res, qcRes)) {
            setIsError(true);
            setErrorValue(tanFi1Res, tanFi2Res, qcRes);
            return;
        }

        setP(pInpt);
        setFi1(fi1Inpt);
        setFi2(fi2Inpt);

        setTanFi1(tanFi1Res.toFixed(2));
        setTanFi2(tanFi2Res.toFixed(2));
        setQc(qcRes.toFixed(2));
    }

    return (
        <Majax.Provider>
            <Row className="justify-content-center">
                <Col lg="8">
                    <Card className="mt-3 mb-3">
                        <CardHeader><h3>Пример 2</h3></CardHeader>
                        <CardBody>
                            <CardSubtitle><h4>Условие</h4></CardSubtitle>
                            <CardText>
                                Коэффициент мощности установки равен 0,63.
                                Определить, какую реактивную мощность необходимо компенсировать, чтобы требуемый коэффициент мощности стал равным 0,97.
                                Активная потребляемая мощность составляет 120 Вт.
                        </CardText>
                            <CardSubtitle><h4>Входные данные</h4></CardSubtitle>
                            <Alert className="mt-3" color="info">Дробные значения нужно вводить через точку</Alert>
                            <Row>
                                <Col sm={2}>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                {mathjaxNode("P")}
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input style={inputGroupStyle} onChange={e => setPInpt(changeValue(e))} />
                                    </InputGroup>
                                </Col>
                                <Col sm={2}>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                {mathjaxNode("ϕ_{1}")}
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input style={inputGroupStyle} onChange={e => setFi1Inpt(changeValue(e))} />
                                    </InputGroup>
                                </Col>
                                <Col sm={2}>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                {mathjaxNode("ϕ_{2}")}
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input style={inputGroupStyle} onChange={e => setFi2Inpt(changeValue(e))} />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <CardSubtitle className="mt-3"><h4>Решение</h4></CardSubtitle>
                            <Alert className="mt-3" color="danger" isOpen={isError}>Невозможно посчитать</Alert>
                            <CardText>
                                Выразим тангенс угла через коэффициент мощности и воспользуемся формулой (5.10):
                        </CardText>
                            <CardText className="text-center">
                                <Majax.Node inline formula="tgϕ=\frac{\sqrt{1-cos^2ϕ}}{cosϕ}" />
                            </CardText>
                            <CardText className="text-center">
                                <Majax.Node inline formula={`tgϕ_{1}=\\frac{\\sqrt{1-cos^2${fi1}}}{cos${fi1}}=${tanFi1}`} />
                            </CardText>
                            <CardText className="text-center">
                                <Majax.Node inline formula={`tgϕ_{2}=\\frac{\\sqrt{1-cos^2${fi2}}}{cos${fi2}}=${tanFi2}`} />
                            </CardText>
                            <CardText>
                                Тогда реактивная мощность компенсатора будет равна
                        </CardText>
                            <CardText className="text-center">
                                <Majax.Node inline formula={`Q_{c}=P(tgϕ_{1}-tgϕ_{2})=${p}*(${tanFi1}-${tanFi2})=${qc} ВАр`} />
                            </CardText>
                        </CardBody>
                        <CardFooter>
                            <Button onClick={resolve}>Рассчитать</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </Majax.Provider>
    )
}

export default Example2;