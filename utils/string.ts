export function camalToKebab(value: string) {
  return value.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}

export function buildRule(properties: React.CSSProperties, selector: string) {
  return [
    `${selector} {`,
    Object.entries(properties)
      .filter(([key, value]) => !!value)
      .map(([key, value]) => `  ${camalToKebab(key)}: ${value}`)
      .join(";\n"),
    "}\n",
  ].join("\n");
}

export function buildRules(
  items: React.CSSProperties[],
  linked: boolean,
  selector: string
) {
  return linked
    ? buildRule(items[0], selector)
    : items
        .map((item, index) =>
          buildRule(item, `${selector}:nth-child(${index + 1})`)
        )
        .join("\n");
}
