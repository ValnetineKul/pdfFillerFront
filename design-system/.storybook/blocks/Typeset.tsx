import type { CSSProperties } from 'react';

/**
 * Renders a typesetting table to display various text styles alongside sample text.
 * This component is useful for visualizing different text styles and their application.
 */

type TypesetProps = {
  textStyles: Record<string, CSSProperties>;
  sampleText?: string;
};

const styles: Record<string, CSSProperties> = {
  table: { width: '100%', tableLayout: 'fixed', marginTop: 0 },
  keyColumn: { padding: '10px', width: 50 },
  valueColumn: { padding: '10px', width: 200 },
  sampleColumn: { padding: '10px', width: '100%' },
  pre: { fontSize: 12 },
  sampleText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

export const Typeset = (props: TypesetProps) => {
  const { textStyles, sampleText } = props;

  return (
    <table style={styles.table}>
      <tbody>
        {Object.entries(textStyles).map(([key, value]) => {
          return (
            <tr key={key}>
              <td style={styles.keyColumn}>{key}</td>
              <td style={styles.valueColumn}>
                <pre style={styles.pre}>{JSON.stringify(value, null, 2)}</pre>
              </td>
              <td style={styles.sampleColumn}>
                <p
                  style={{
                    ...value,
                    ...styles.sampleText,
                  }}
                >
                  {sampleText}
                </p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
