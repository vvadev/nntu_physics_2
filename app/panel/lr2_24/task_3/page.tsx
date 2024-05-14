"use client";

import { GridImage } from "@/components/gridImage/gridImage";
import { Input, Slider, Spacer } from "@nextui-org/react";
import { useState } from "react";

export default function Page() {
    function getLr3(
        x: number,
        y: number,
        left: number,
        right: number,
        radius: number,
        center_x: number,
        center_y: number,
        leftpotential: number,
        rightpotential: number
    ): number {
        if (left > right) {
            let temp = left;
            left = right;
            right = temp;
            temp = leftpotential;
            leftpotential = rightpotential;
            rightpotential = temp;
        }
        if (x < left) return leftpotential;
        if (x > right) return rightpotential;
        const inside_potential =
            ((center_x - left) / (right - left)) *
                (rightpotential - leftpotential) +
            leftpotential;
        if (x === center_x) return inside_potential;
        const tg_p = (y - center_y) / (x - center_x);
        const right_dir = x > center_x;
        const vert = right_dir
            ? (right - center_x) * tg_p
            : (center_x - left) * tg_p;
        const diag = right_dir
            ? Math.sqrt(vert * vert + (right - center_x) * (right - center_x))
            : Math.sqrt(vert * vert + (center_x - left) * (center_x - left));
        const r = Math.sqrt(
            (x - center_x) * (x - center_x) + (y - center_y) * (y - center_y)
        );

        if (r <= radius) return inside_potential;
        let coef = 0.82;
        let diag_pow = Math.pow(diag - radius, coef);
        let r_pow = Math.pow(r - radius, coef);

        return right_dir
            ? inside_potential +
                  ((rightpotential - inside_potential) * r_pow) / diag_pow
            : inside_potential +
                  ((leftpotential - inside_potential) * r_pow) / diag_pow;
    }

    // позиция левой линии по оси x
    const [x1, setX1] = useState(-5);
    // позиция правой линии по оси x
    const [x2, setX2] = useState(5);

    // левый и правый потенциалы
    const [leftPotential, setLeftPotential] = useState(0);
    const [rightPotential, setRightPotential] = useState(5);

    // позиция круга
    const [circlePosition, setCirclePosition] = useState(0);

    // координаты выбранной точки
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

    // потенциал, который рассчитывается при изменении координаты точки
    const [potential, setPotential] = useState(0);

    const radius = 2.3;

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
                    <Spacer y={2} />
                    <Slider
                        label="Радиус кольца:"
                        isDisabled={true}
                        showTooltip={true}
                        minValue={2.3}
                        maxValue={2.3}
                        step={0.1}
                        defaultValue={radius}
                        className="max-w-md mt-2"
                    />
                    <Spacer y={2} />
                    <Slider
                        label="Позиция кольца по оси Y:"
                        showTooltip={true}
                        minValue={-10}
                        maxValue={10}
                        step={0.1}
                        defaultValue={circlePosition}
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
                            if (radius + v < 10 && -radius + v > -10) {
                                setCirclePosition(v);
                            }
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-6 items-center justify-center p-4">
                <GridImage
                    onTap={(x: number, y: number) => {
                        setClickPosition({ x, y });
                        setPotential(
                            Number(
                                getLr3(
                                    x,
                                    y,
                                    x1,
                                    x2,
                                    2.3,
                                    0,
                                    circlePosition,
                                    leftPotential,
                                    rightPotential
                                ).toFixed(3)
                            )
                        );
                    }}
                    lines={[x1, x2]}
                    circles={[{ radius: radius, y: circlePosition }]}
                />
            </div>
        </div>
    );
}
