"use client";

import { GridImage } from "@/components/gridImage/gridImage";
import { Input, Slider, Spacer } from "@nextui-org/react";
import { useState } from "react";

export default function Page() {
    function getLr1(
        x: number,
        y: number,
        left: number,
        right: number,
        leftpotential: number,
        rightpotential: number
    ): number {
        if (x > right) {
            return rightpotential;
        }

        if (x < left) {
            return leftpotential;
        }

        if (left > right) {
            let temp = left;
            left = right;
            right = temp;
            temp = leftpotential;
            leftpotential = rightpotential;
            rightpotential = temp;
        }

        return (
            ((x - left) / (right - left)) * (rightpotential - leftpotential) +
            leftpotential
        );
    }

    // позиция левой линии по оси x
    const [x1, setX1] = useState(-5);
    // позиция правой линии по оси x
    const [x2, setX2] = useState(5);

    // левый и правый потенциалы
    const [leftPotential, setLeftPotential] = useState(0);
    const [rightPotential, setRightPotential] = useState(5);

    // координаты выбранной точки
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

    // потенциал, который рассчитывается при изменении координаты точки
    const [potential, setPotential] = useState(0);

    return (
        <div className="flex lg:flex-row flex-col gap-0 overflow-y-hidden p-0 sm:rounded-large sm:border-small sm:border-default-200">
            <div className="flex flex-col flex-4 border-r-small border-default-200">
                <div className="border-b-small border-default-200 p-4">
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        3.3 Исследование электростатического поля плоского
                        конденсатора
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
                        label="Левый электрод:"
                        showTooltip={true}
                        minValue={-10}
                        maxValue={10}
                        step={0.1}
                        defaultValue={x1}
                        marks={[
                            {
                                value: -5,
                                label: "-5",
                            },
                            {
                                value: 0,
                                label: "0",
                            },
                            {
                                value: 5,
                                label: "5",
                            },
                        ]}
                        className="max-w-md mt-2"
                        onChange={(e) => {
                            const v = Number(e);
                            if (v < x2) {
                                setX1(v);
                            }
                        }}
                    />
                    <Spacer y={2} />
                    <Slider
                        label="Правый электрод:"
                        showTooltip={true}
                        minValue={-10}
                        maxValue={10}
                        step={0.1}
                        defaultValue={x2}
                        marks={[
                            {
                                value: -5,
                                label: "-5",
                            },
                            {
                                value: 0,
                                label: "0",
                            },
                            {
                                value: 5,
                                label: "5",
                            },
                        ]}
                        className="max-w-md mt-2"
                        onChange={(e) => {
                            const v = Number(e);
                            if (v > x1) {
                                setX2(v);
                            }
                        }}
                    />
                    <Spacer y={2} />
                    <div>
                        <p className="text-base font-medium text-default-700">
                            Левый потенциал
                        </p>
                        <Input
                            className="mt-2"
                            placeholder="Потенциал"
                            value={leftPotential.toString()}
                            onChange={(e) =>
                                setLeftPotential(parseFloat(e.target.value))
                            }
                        />
                    </div>
                    <Spacer y={2} />
                    <div>
                        <p className="text-base font-medium text-default-700">
                            Правый потенциал
                        </p>
                        <Input
                            className="mt-2"
                            placeholder="Потенциал"
                            value={rightPotential.toString()}
                            onChange={(e) =>
                                setRightPotential(parseFloat(e.target.value))
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
                                getLr1(
                                    x,
                                    y,
                                    x1,
                                    x2,
                                    leftPotential,
                                    rightPotential
                                ).toFixed(3)
                            )
                        );
                    }}
                    lines={[x1, x2]}
                />
            </div>
        </div>
    );
}
