import React from "react";
import { camalToKebab } from "../utils/string";

type As<Props = any> = React.ElementType<Props>;

type PropsWithAs<Props = {}, Type extends As = As> = Props &
  Omit<React.ComponentProps<Type>, "as" | keyof Props> & {
    as?: Type;
  };

function HTMLCamelToKebab(key) {
  switch (key) {
    case "htmlFor":
      return "for";
    case "className":
      return "class";
    default:
      return camalToKebab(key);
  }
}

function outputProperties<Type extends As = As, Props = {}>(
  props: PropsWithAs<Props, Type>
) {
  const entries = Object.entries(props);
  return entries.length
    ? ` ${Object.entries(props)
        .map(([key, value]) => `${HTMLCamelToKebab(key)}="${value}"`)
        .join(" ")}`
    : "";
}

export function OutputElement({
  children,
  as,
  indent,
  ...props
}: PropsWithAs<{ children?: React.ReactNode; indent: number }, "div">) {
  return children
    ? `${"".padStart(indent * 2, " ")}<${as}${outputProperties<typeof as>(
        props
      )}>\n${React.Children.map(children, (child) => {
        if (typeof child === "number" || typeof child === "string") {
          return `${"".padStart(indent * 2 + 2, " ")}${child}`;
        } else if (typeof child === "object" && "props" in child) {
          return `${OutputElement(child.props)}`;
        } else {
          return "";
        }
      }).join("\n")}\n${"".padStart(indent * 2, " ")}</${as}>`
    : `${"".padStart(indent * 2, " ")}<${as} ${outputProperties<typeof as>(
        props
      )}>\n${"".padStart(indent * 2, " ")}</${as}>\n`;
}

OutputElement.defaultProps = { indent: 0, as: "div" };
