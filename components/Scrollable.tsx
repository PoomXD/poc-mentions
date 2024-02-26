import { FC, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import styles from "./styles.module.css";

interface Props {
  data: {
    id: string;
    display: string;
  }[];
}

const Scrollable: FC<Props> = ({ data }): JSX.Element => {
  const [value, setValue] = useState("");
  const [mentions, setMentions] = useState([]);

  const handleInputChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const handleAddMention = (id: string | number, display: string) => {
    console.log(id, display);
    setMentions([...mentions, id]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h3>POC Mentions</h3>

      <MentionsInput
        classNames={styles}
        value={value}
        onChange={handleInputChange}
        placeholder={"Mention people using '@'"}
      >
        <Mention
          className={styles.mentions__mention}
          markup="@[__display__](user:__id__)"
          displayTransform={(url) => `@${url}`}
          trigger="@"
          data={data}
          renderSuggestion={(suggestion, search, highlightedDisplay, index, focused) => {
            return (
              <>
                <div>{suggestion.display}</div>
                <div>some text</div>
              </>
            );
          }}
          onAdd={handleAddMention}
        />
      </MentionsInput>
    </div>
  );
};

export default Scrollable;
