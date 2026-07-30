import { useEffect, useState } from "react";

type AnimatedCounterProps = {
    value: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
};

function AnimatedCounter({
    value,
    duration = 800,
    decimals = 0,
    prefix = "",
    suffix = "",
}: AnimatedCounterProps) {

    const [displayValue, setDisplayValue] =
        useState(value);

    useEffect(() => {

        const startValue =
            displayValue;

        const difference =
            value - startValue;

        if (difference === 0) {
            return;
        }

        const startTime =
            performance.now();

        let animationFrame = 0;

        function update(
            currentTime: number
        ) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                        duration,
                    1
                );

           const easedProgress =
    1 - Math.pow(1 - progress, 3);

const nextValue =
    Math.round(
        startValue +
            difference *
                easedProgress
    );

            setDisplayValue(
                nextValue
            );

            if (progress < 1) {

                animationFrame =
                    requestAnimationFrame(
                        update
                    );

            }

        }

        animationFrame =
            requestAnimationFrame(
                update
            );

        return () => {

            cancelAnimationFrame(
                animationFrame
            );

        };

    }, [value, duration, displayValue]);

    return (
    <span>
    
    {prefix}
    {displayValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    })}
    {suffix}

    </span>
);

}

export default AnimatedCounter;