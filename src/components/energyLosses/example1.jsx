import React, { useState } from 'react';
import Majax from 'react-mathjax';
import { inputGroupStyle } from './../../common/styles';
import { changeValue, mathjaxNode, containsErrorValue, setErrorValue } from './../../common/example';
import { Card, CardBody, CardHeader, CardSubtitle, CardText, Alert, Row, Col, InputGroupText, Input, InputGroupAddon, InputGroup, CardFooter, Button } from 'reactstrap';

const Example1 = () => {
    const [isError, setIsError] = useState(false);

    const [r, setR] = useState(0);
    const [rInpt, setRInpt] = useState(0);

    const [xl, setXl] = useState(0);
    const [xlInpt, setXlInpt] = useState(0);

    const [xc, setXc] = useState(0);
    const [xcInpt, setXcInpt] = useState(0);

    const [u, setU] = useState(0);
    const [uInpt, setUInpt] = useState(0);

    const [z1, setZ1] = useState(0);
    const [cosFi1, setCosFi1] = useState(0);
    const [z2, setZ2] = useState(0);
    const [cosFi2, setCosFi2] = useState(0);
    const [p1, setP1] = useState(0);
    const [p2, setP2] = useState(0);
    const [deltaP, setDeltaP] = useState(0);

    const resolve = () => {
        setIsError(false);

        let z1Res = Math.sqrt(Math.pow(rInpt, 2) + Math.pow(xlInpt, 2));
        let z2Res = Math.sqrt(Math.pow(rInpt, 2) + Math.pow(xlInpt - xcInpt, 2));
        let cosFi1Res = 60 / z1Res;
        let cosFi2Res = 60 / z2Res;
        let p1Res = (Math.pow(uInpt, 2) * cosFi1Res) / z1Res;
        let p2Res = (Math.pow(uInpt, 2) * cosFi2Res) / z2Res;
        let deltaPRes = p2Res - p1Res;

        let containsError = containsErrorValue(z1Res, z2Res, cosFi1Res, cosFi2Res, p1Res, p2Res, deltaPRes);
        if (containsError) {
            setIsError(true);
            setErrorValue(z1Res, z2Res, cosFi1Res, cosFi2Res, p1Res, p2Res, deltaPRes);
            return;
        }

        setR(rInpt);
        setXl(xlInpt);
        setXc(xcInpt);
        setU(uInpt);

        setZ1(z1Res.toFixed(0));
        setZ2(z2Res.toFixed(0));
        setCosFi1(cosFi1Res.toFixed(1));
        setCosFi2(cosFi2Res.toFixed(1))
        setP1(p1Res.toFixed(0));
        setP2(p2Res.toFixed(0));
        setDeltaP(deltaPRes.toFixed(0));
    }

    return (
        <Majax.Provider>
            <Row className="justify-content-center">
                <Col lg="8">
                    <Card className="mt-3 mb-3">
                        <CardHeader><h3>Пример 1</h3></CardHeader>
                        <CardBody>
                            <CardSubtitle><h4>Условие</h4></CardSubtitle>
                            <CardText>
                                В цепь переменного тока включены последовательно соединенные
                            резистор {mathjaxNode("R")} и катушка
                            индуктивности {mathjaxNode("X_{l}")}.
                            Для компенсации реактивной мощности последовательно в цепь включен конденсатор с
                            емкостным сопротивлением {mathjaxNode("X_{c}")}.
                            Напряжение в питающей электросети равно {mathjaxNode("U")}.
                            Найти коэффициенты мощности до установки компенсатора и после. Определить, на какую величину изменилась активная потребляемая мощность.
                        </CardText>
                            <CardSubtitle><h4>Входные данные</h4></CardSubtitle>
                            <Alert className="mt-3" color="info">Дробные значения нужно вводить через точку</Alert>
                            <Row>
                                <Col sm={2}>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                {mathjaxNode("R, Ом")}
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input style={inputGroupStyle} onChange={e => setRInpt(changeValue(e))} />
                                    </InputGroup>
                                </Col>
                                <Col sm={2}>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                {mathjaxNode("X_{l}, Ом")}
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input style={inputGroupStyle} onChange={e => setXlInpt(changeValue(e))} />
                                    </InputGroup>
                                </Col>
                                <Col sm={2}>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                {mathjaxNode("X_{c}, Ом")}
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input style={inputGroupStyle} onChange={e => setXcInpt(changeValue(e))} />
                                    </InputGroup>
                                </Col>
                                <Col sm={2}>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                {mathjaxNode("U, В")}
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input style={inputGroupStyle} onChange={e => setUInpt(changeValue(e))} />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <CardSubtitle className="mt-3"><h4>Решение</h4></CardSubtitle>
                            <Alert className="mt-3" color="danger" isOpen={isError}>Невозможно посчитать</Alert>
                            <CardText>
                                Для цепи без компенсатора импеданс и модуль импеданса определяются по следующим формулам:
                        </CardText>
                            <CardText className="text-center">
                                <Majax.Node inline formula={`Z_{l} = R + jX_{l} = ${r} + ${xl}j`} />
                            </CardText>
                            <CardText className="text-center">
                                <Majax.Node inline formula={`|Z_{l}|=\\sqrt{R^2 + X_{l}^2} = \\sqrt{${r}^2 + ${xl}^2} = ${z1} Ом`} />
                            </CardText>
                            <CardText>
                                Для цепи с компенсатором импеданс и модуль импеданса соответственно равны:
                        </CardText>
                            <CardText className="text-center">
                                <Majax.Node inline formula={`Z_{2}=R+j(X_{l} - X_{c})=${r} + j(${xl} - ${xc})`} />
                            </CardText>
                            <CardText className="text-center">
                                <Majax.Node inline formula={`|Z_{2}|=\\sqrt{R^2 + X_{l}^2}=\\sqrt{${r}^2 + ${xl - xc}^2}=${z2} Ом`} />
                            </CardText>
                            <CardText>
                                Расчет коэффициентов мощности произведем по формуле (5.9):
                        </CardText>
                            <CardText className="text-center">
                                <Majax.Node inline formula={`cosϕ_{1}=\\frac{60}{${z1}}=${cosFi1}`} />;
                            <Majax.Node inline formula={`cosϕ_{2}=\\frac{60}{${z2}}=${cosFi2}`} />
                            </CardText>
                            <CardText>
                                Вычислим активную потребляемую мощность при отсутствии
                                компенсатора. Векторная диаграмма для токов и напряжений будет выглядеть аналогично рис. 5.3, а. Из прямоугольного треугольника имеем
                        </CardText>
                            <CardText className="text-center">
                                <Majax.Node inline formula={`P_{1}=U_{R}I=Ucosϕ_{1}\\frac{U}{|Z_{1}|}=\\frac{${u}^2*0.6}{100}=${p1} Вт.`} />
                            </CardText>
                            <CardText>
                                Аналогично проводим расчет активной потребляемой мощности при наличии компенсатора, воспользовавшись векторной диаграммой (рис. 5.3, б):
                        </CardText>
                            <CardText className="text-center">
                                <Majax.Node inline formula={`P_{2}=U_{R}I=Ucosϕ_{2}\\frac{U}{|Z_{2}|}=\\frac{${u}^2*0.9}{67}=${p2} Вт.`} />
                            </CardText>
                            <CardText>
                                При введении компенсатора активная потребляемая мощность выросла на величину
                        </CardText>
                            <CardText className="text-center">
                                <Majax.Node inline formula={`ΔP=P_{2}-P_{1}=${p2}-${p1}=${deltaP} Вт`} />
                            </CardText>
                            <CardText>
                                Однако на практике обычно встречаются ситуации, когда мощность нагрузки остается постоянной величиной P = const
                                и требуется рассчитать, какую реактивную мощность необходимо компенсировать, чтобы значение коэффициента мощности возросло до
                                определенной величины. Эта мощность рассчитывается по формуле
                        </CardText>
                            <CardText className="text-center">
                                <Majax.Node inline formula="Q_{c}=Pk=P(tgϕ_{1}-tgϕ_{2})" /> (5.10)
                        </CardText>
                            <CardText>
                                где k – коэффициент преобразования активной мощности в реактивную мощность компенсирующего устройства (конденсатора).
                                Значения коэффициента k можно найти в табулированном виде.
                        </CardText>
                            <CardText>
                                Годовая экономия электроэнергии в кВт·ч при установке
                                компенсирующих устройств рассчитывается по следующей формуле [7]:
                        </CardText>
                            <CardText className="text-center">
                                <Majax.Node inline formula="ΔЭ=Q_{c}K_{э}τ" /> (5.11)
                        </CardText>
                            <CardText>
                                где Кэ – экономический эквивалент, равный 0,1 кВт/кВАр; τ – количество часов работы компенсирующего устройства в год.
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

export default Example1;