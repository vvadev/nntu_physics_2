"use client";

import { GridImage } from "@/components/gridImage/gridImage";
import { Input, Slider, Spacer } from "@nextui-org/react";
import { useState } from "react";

export default function Page() {
    function getLr2(
        x: number,
        y: number,
        inside_r: number,
        outside_r: number,
        inside_potential: number,
        outside_potential: number
    ): number {
        if (inside_r > outside_r) {
            let temp = inside_r;
            inside_r = outside_r;
            outside_r = temp;
            temp = inside_potential;
            inside_potential = outside_potential;
            outside_potential = temp;
        }
        const r = Math.sqrt(x * x + y * y);
        if (r < inside_r) return inside_potential;
        if (r > outside_r) return outside_potential;
        const linear_area_length = Math.log(outside_r / inside_r);
        const potential_position_in_linear_area = Math.log(r / inside_r);
        return (
            inside_potential +
            (potential_position_in_linear_area / linear_area_length) *
                (outside_potential - inside_potential)
        );
    }

    // радиус внутреннего круга
    const [insideRadius, setInsideRadius] = useState(2);
    // радиус внешнего круга
    const [outsideRadius, setOutsideRadius] = useState(5);

    // левый и правый потенциалы
    const [insidePotential, setInsidePotential] = useState(0);
    const [outsidePotential, setOutsidePotential] = useState(5);

    // координаты выбранной точки
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

    // потенциал, который рассчитывается при изменении координаты точки
    const [potential, setPotential] = useState(0);

    return (
        <div className="flex lg:flex-row flex-col gap-0 overflow-y-hidden p-0 sm:rounded-large sm:border-small sm:border-default-200">
            <div className="flex flex-col flex-4 border-r-small border-default-200">
                <div className="border-b-small border-default-200 p-4">
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        3.4 Исследование электростатического поля
                        цилиндрического конденсатора
                    </h2>
                </div>
                <div className="flex flex-row justify-between border-b-small border-default-200 p-4 w-full">
                    <h3>
                        Выбранная точка:
                        <br />({clickPosition.x}, {clickPosition.y})
                    </h3>
                    <h3 className=" text-end">
                        Потенциал:
                        <br />
                        {potential}
                    </h3>
                </div>
                <div className="flex flex-col p-4">
                    <Slider
                        label="Радиус внутреннего кольца:"
                        showTooltip={true}
                        minValue={0}
                        maxValue={10}
                        step={0.1}
                        defaultValue={insideRadius}
                        marks={[
                            {
                                value: 0,
                                label: "0",
                            },
                            {
                                value: 5,
                                label: "5",
                            },
                            {
                                value: 10,
                                label: "10",
                            },
                        ]}
                        className="max-w-md mt-2"
                        onChange={(e) => {
                            const v = Number(e);
                            if (v < outsideRadius) {
                                setInsideRadius(v);
                            }
                        }}
                    />
                    <Spacer y={2} />
                    <Slider
                        label="Радиус внешнего кольца:"
                        showTooltip={true}
                        minValue={0}
                        maxValue={10}
                        step={0.1}
                        defaultValue={outsideRadius}
                        marks={[
                            {
                                value: 0,
                                label: "0",
                            },
                            {
                                value: 5,
                                label: "5",
                            },
                            {
                                value: 10,
                                label: "10",
                            },
                        ]}
                        className="max-w-md mt-2"
                        onChange={(e) => {
                            const v = Number(e);
                            if (v > insideRadius) {
                                setOutsideRadius(v);
                            }
                        }}
                    />
                    <Spacer y={2} />
                    <div>
                        <p className="text-base font-medium text-default-700">
                            Внутренний потенциал
                        </p>
                        <Input
                            className="mt-2"
                            placeholder="Потенциал"
                            value={insidePotential.toString()}
                            onChange={(e) =>
                                setInsidePotential(parseFloat(e.target.value))
                            }
                        />
                    </div>
                    <Spacer y={2} />
                    <div>
                        <p className="text-base font-medium text-default-700">
                            Внешний потенциал
                        </p>
                        <Input
                            className="mt-2"
                            placeholder="Потенциал"
                            value={outsidePotential.toString()}
                            onChange={(e) =>
                                setOutsidePotential(parseFloat(e.target.value))
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-6 items-center justify-center p-4">
                <GridImage
                    onTap={(x: number, y: number) => {
                        setClickPosition({ x, y });
                        setPotential(
                            Number(
                                getLr2(
                                    x,
                                    y,
                                    insideRadius,
                                    outsideRadius,
                                    insidePotential,
                                    outsidePotential
                                ).toFixed(3)
                            )
                        );
                    }}
                    circles={[
                        { radius: insideRadius, y: 0 },
                        { radius: outsideRadius, y: 0 },
                    ]}
                />
            </div>
        </div>
    );
}
