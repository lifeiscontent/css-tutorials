import React, { useState, Fragment } from "react";
import { withRouter } from "next/router";
import { hsl } from "polished";
import { OutputElement } from "../../components/output-element";
import { buildRule, buildRules } from "../../utils/string";

function TopicDetailPage(props) {
  const [linked, setLinked] = useState(false);
  const [container, setContainer] = useState<React.CSSProperties>({
    display: "flex",
  });
  const [items, setItems] = useState<React.CSSProperties[]>(
    Array.from({ length: 3 }, () => ({}))
  );

  function onChangeContainer(event) {
    setContainer({
      ...container,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  function onChangeItems(event) {
    setItems(
      items.map((item) => ({
        ...item,
        [event.currentTarget.name]: event.currentTarget.value,
      }))
    );
  }

  function onChangeItem(index) {
    return function (event) {
      setItems(
        items.map((item, i) =>
          i === index
            ? { ...item, [event.currentTarget.name]: event.currentTarget.value }
            : item
        )
      );
    };
  }

  return (
    <div>
      <h2>Flexbox</h2>
      <div className="grid">
        <div className="grid-item">
          <form>
            <Container onChange={onChangeContainer} />
            <label style={{ fontWeight: 700 }}>
              Link{" "}
              <input
                type="checkbox"
                checked={linked}
                onChange={(event) => {
                  setLinked(event.currentTarget.checked);
                }}
              />
            </label>
            {linked ? (
              <Items onChange={onChangeItems} />
            ) : (
              <Fragment>
                {items.map((item, index) => (
                  <Items onChange={onChangeItem(index)} key={index} />
                ))}
              </Fragment>
            )}
          </form>
        </div>
        <div className="grid-item">
          <input
            type="range"
            min="1"
            max="12"
            step="1"
            defaultValue="3"
            onChange={(event) => {
              const valueAsNumber = parseInt(event.currentTarget.value, 10);

              if (!isNaN(valueAsNumber)) {
                if (linked) {
                  setItems(
                    Array.from({ length: valueAsNumber }, () => items[0])
                  );
                } else {
                  setItems(
                    Array.from({ length: valueAsNumber }, (v, k) =>
                      typeof items[k] !== "undefined" ? items[k] : {}
                    )
                  );
                }
              }
            }}
          />
          <div className="flex-container" style={container}>
            {items.map((item, index) => (
              <div
                className="flex-item"
                style={{ ...item, backgroundColor: hsl(index * 10, 1, 0.5) }}
                key={index}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid">
        <div className="grid-item">
          <pre>
            <output>{`
${buildRule(container, ".flex-container")}
${buildRules(items, linked, ".flex-item")}
`}</output>
          </pre>
        </div>
        <div className="grid-item">
          <pre>
            <output>
              <OutputElement className="flex-container">
                {items.map((item, index) => (
                  <OutputElement className="flex-item" indent={1} key={index}>
                    {index + 1}
                  </OutputElement>
                ))}
              </OutputElement>
            </output>
          </pre>
        </div>
      </div>
      <style jsx>{`
        .grid {
          display: flex;
        }

        .grid-item {
          flex-basis: 50%;
        }

        .flex-container {
          width: 500px;
          height: 500px;
          background-color: grey;
          transition: 300ms ease;
        }

        .flex-item {
          padding: 1em;
          transition: 300ms ease;
        }
      `}</style>
    </div>
  );
}

function Container(props) {
  return (
    <fieldset>
      <legend>Container</legend>
      <p>
        <label>align-content</label>
        <select name="alignContent" onChange={props.onChange}>
          <option />
          <option>center</option>
          <option>flex-end</option>
          <option>flex-start</option>
          <option>space-around</option>
          <option>space-between</option>
          <option>stretch</option>
        </select>
      </p>
      <p>
        <label>align-items</label>
        <select name="alignItems" onChange={props.onChange}>
          <option />
          <option>baseline</option>
          <option>center</option>
          <option>flex-end</option>
          <option>flex-start</option>
          <option>stretch</option>
        </select>
      </p>
      <p>
        <label>flex-direction</label>
        <select name="flexDirection" onChange={props.onChange}>
          <option />
          <option>column-reverse</option>
          <option>column</option>
          <option>row-reverse</option>
          <option>row</option>
        </select>
      </p>
      <p>
        <label>gap</label>
        <input
          type="text"
          name="gap"
          onChange={props.onChange}
          placeholder="<'row-gap'> <'column-gap'>?"
        />
      </p>
      <p>
        <label>justify-content</label>
        <select name="justifyContent" onChange={props.onChange}>
          <option />
          <option>center</option>
          <option>flex-end</option>
          <option>flex-start</option>
          <option>space-around</option>
          <option>space-between</option>
          <option>space-evenly</option>
          <option>stretch</option>
        </select>
      </p>
    </fieldset>
  );
}

function Items(props) {
  return (
    <fieldset>
      <legend>Items</legend>
      <p>
        <label>align-self</label>
        <select name="alignSelf" onChange={props.onChange}>
          <option />
          <option>auto</option>
          <option>baseline</option>
          <option>center</option>
          <option>flex-end</option>
          <option>flex-start</option>
          <option>stretch</option>
        </select>
      </p>
      <p>
        <label>flex-basis</label>
        <input
          type="text"
          name="flexBasis"
          placeholder="<length-percentage> | auto"
          onChange={props.onChange}
        />
      </p>
      <p>
        <label>flex-grow</label>
        <input
          type="number"
          name="flexGrow"
          placeholder="<number>"
          onChange={props.onChange}
        />
      </p>
      <p>
        <label>flex-shrink</label>
        <input
          type="number"
          name="flexShrink"
          placeholder="<number>"
          onChange={props.onChange}
        />
      </p>
      <p>
        <label>flex-wrap</label>
        <select name="flexWrap" onChange={props.onChange}>
          <option />
          <option>nowrap</option>
          <option>wrap-reverse</option>
          <option>wrap</option>
        </select>
      </p>
      <p>
        <label>order</label>
        <input
          type="number"
          name="order"
          placeholder="<number>"
          onChange={props.onChange}
        />
      </p>
    </fieldset>
  );
}

export default withRouter(TopicDetailPage);
