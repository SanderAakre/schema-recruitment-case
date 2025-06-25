// MUI components
import { Typography, Tooltip, Link, Box } from "@mui/material";

// Types/interfaces
import type { TextData } from "@/types";

interface TextCompProps {
  data: string | TextData;
  defaultType?: "body1" | "body2" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * TextComp renders text based on the JSON data structure provided.
 * It supports different typography variants and can apply Tailwind CSS classes.
 *
 * @param {string | TextData} data - The text data to render. It can be a string or an object containing text, spans, and other properties.
 * @param {string} [defaultType="body1"] - The default typography variant to use if the type is not specified in the data. It can be one of "body1",
 * @returns {JSX.Element} The rendered text component.
 */
export const TextComp = ({ data, defaultType = "body1" }: TextCompProps) => {
  const obj: TextData = typeof data === "string" ? { text: data } : data ?? {};

  const { text, spans, type = defaultType, tailwindClasses } = obj;

  return (
    <Box className={tailwindClasses}>
      <Typography variant={type}>
        {spans?.length
          ? spans.map((s, i) =>
              s.link ? (
                <Tooltip key={i} title={s.hoverText ?? ""}>
                  <Link
                    href={s.link}
                    underline={s.underline ? "always" : "hover"}
                    fontWeight={s.bold ? "bold" : "normal"}
                    fontStyle={s.italic ? "italic" : "normal"}
                  >
                    {s.text}
                  </Link>
                </Tooltip>
              ) : (
                <Tooltip key={i} title={s.hoverText ?? ""}>
                  <span
                    style={{
                      fontWeight: s.bold ? "bold" : undefined,
                      fontStyle: s.italic ? "italic" : undefined,
                      textDecoration: s.underline ? "underline" : undefined,
                    }}
                  >
                    {s.text}
                  </span>
                </Tooltip>
              )
            )
          : text ?? ""}
      </Typography>
    </Box>
  );
};

export default TextComp;

// *** Title and Subtitle Components ***

interface Props {
  data: string | TextData;
}

/** TitleComp is a specialized component that renders text as a title (h2).
 * It uses the TextComp component to handle the rendering.
 * @param {string | TextData} data - The text data to render as a title. It can be a string or an object containing text, spans, and other properties.
 * @returns {JSX.Element} The rendered title component.
 */
export const TitleComp = ({ data }: Props) => {
  return <TextComp data={data} defaultType="h1" />;
};

/** PageTitleComp is a specialized component that renders text as a subtitle (h4).
 * It uses the TextComp component to handle the rendering.
 * @param {string | TextData} data - The text data to render as a subtitle. It can be a string or an object containing text, spans, and other properties.
 * @returns {JSX.Element} The rendered subtitle component.
 */
export const PageTitleComp = ({ data }: Props) => {
  return <TextComp data={data} defaultType="h2" />;
};

/** GroupTitleComp is a specialized component that renders text as a group title (h3).
 * It uses the TextComp component to handle the rendering.
 * @param {string | TextData} data - The text data to render as a group title. It can be a string or an object containing text, spans, and other properties.
 * @returns {JSX.Element} The rendered group title component.
 */
export const GroupTitleComp = ({ data }: Props) => {
  return <TextComp data={data} defaultType="h3" />;
};
