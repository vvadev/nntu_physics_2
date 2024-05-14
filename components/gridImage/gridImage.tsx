"use client";
import { useState, useEffect, useRef } from "react";
import { GridImageProps } from "./gridImage.props";
import Image from "next/image";

export function GridImage({
    onTap,
    children,
    lines = [],
    circles = [],
}: GridImageProps) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== "undefined") {
                setDimensions({
                    width: window.innerHeight,
                    height: window.innerHeight,
                });
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const calculatePixelPosition = (relativePosition: number) => {
        const wHeight = 0.7 * dimensions.height;
        const pixelX = (wHeight / 22) * relativePosition + wHeight / 2;
        return pixelX;
    };

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const [handlePosition, setHandlePosition] = useState({ x: 0, y: 0 });

    const handleMouseClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x =
            ((event.clientX - rect.left - centerX) / rect.height) * 11 * 2; // Преобразование в миллиметры (12 см * 10 мм/см)
        const y =
            (((event.clientY - rect.top - centerY) * -1) / rect.height) *
            11 *
            2; // Преобразование в миллиметры (12 см * 10 мм/см)
        const roundedX = Number(x.toFixed(2)); // Округление до сотых
        const roundedY = Number(y.toFixed(2)); // Округление до сотых
        console.log("Clicked at:", roundedX, roundedY);
        setClickPosition({
            x: event.clientX - rect.left - centerX,
            y: event.clientY - rect.top - centerY,
        });
        onTap(roundedX, roundedY);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x =
            ((event.clientX - rect.left - centerX) / rect.height) * 11 * 2; // Преобразование в миллиметры (12 см * 10 мм/см)
        const y =
            (((event.clientY - rect.top - centerY) * -1) / rect.height) *
            11 *
            2; // Преобразование в миллиметры (12 см * 10 мм/см)
        const roundedX = Number(x.toFixed(2)); // Округление до сотых
        const roundedY = Number(y.toFixed(2)); // Округление до сотых
        setMousePosition({ x: roundedX, y: roundedY });
        setHandlePosition({
            x: event.clientX - rect.left - centerX,
            y: event.clientY - rect.top - centerY,
        });
    };

    return (
        <div>
            <div
                style={{
                    position: "relative",
                    width: 0.7 * dimensions.height,
                    height: 0.7 * dimensions.height,
                }}
                onClick={handleMouseClick}
                onMouseMove={handleMouseMove}
            >
                <Image
                    src="/coord-plane.png"
                    width={0.7 * dimensions.height}
                    height={0.7 * dimensions.height}
                    alt="coord-plane"
                    className="absolute top-0 left-0"
                />
                <div
                    style={{
                        position: "absolute",
                        top: "calc(50% - 4px)",
                        left: "calc(50% - 4px)",
                        transform: `translate(${clickPosition.x}px, ${clickPosition.y}px)`, // Перемещение красной точки в координаты последнего нажатия мыши
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                    }}
                />
                {/* <div
                    style={{
                        position: 'absolute',
                        top: 'calc(50% - 4px)',
                        left: 'calc(50% - 4px)',
                        transform: `translate(${handlePosition.x}px, ${handlePosition.y}px)`, // Перемещение синей точки в текущее положение курсора
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'blue',
                    }}
                /> */}
                {lines.map((x, index) => {
                    const pixelX = calculatePixelPosition(x);
                    return (
                        <div
                            key={index}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: pixelX - 2,
                                width: "4px",
                                height: "100%",
                                backgroundColor: "#2196f3",
                            }}
                        />
                    );
                })}
                {circles.map((circle, index) => {
                    const pixelX = calculatePixelPosition(circle.y * -1);
                    const pixelRadius =
                        calculatePixelPosition(circle.radius) -
                        calculatePixelPosition(0);
                    return (
                        <div
                            key={index}
                            style={{
                                position: "absolute",
                                top: pixelX - pixelRadius - 2,
                                // left: 'calc(50% - ' + pixelRadius + 'px)',
                                left: "calc(50% - " + (pixelRadius + 1) + "px)",
                                width: pixelRadius * 2 + 2,
                                height: pixelRadius * 2 + 2,
                                borderRadius: "50%",
                                backgroundColor: "transparent",
                                border: "4px solid #2196f3",
                            }}
                        />
                    );
                })}
                <div className=" absolute">{children}</div>
            </div>
            <div className="flex flex-row justify-end mt-2">
                <h2>
                    Позиция курсора: {mousePosition.x}, {mousePosition.y}
                </h2>
            </div>
        </div>
    );
}
