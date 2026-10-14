import type { CSSProperties } from 'react';

/**
 * Renders a spacing table to display various spacing values.
 * This component is useful for visualizing different text styles and their application.
 */

type SpacingTableProps = {
  spacing?: {
    main: Array<Array<string>>;
    fractional: Array<Array<string>>;
  };
};

const styles: Record<string, CSSProperties> = {
  table: { width: '100%', tableLayout: 'fixed', marginTop: 0 },
  keyColumn: { padding: '16px', width: 50, fontSize: '16px' },
  headRow: { backgroundColor: '#f9f5ff', fontSize: '16px' },
  valueColumn: { padding: '16px', width: 200, fontSize: '16px' },
};

export const SpacingTable = (props: SpacingTableProps) => {
  const { spacing } = props;

  return (
    <>
      <br />
      <h3>Основные токены</h3>
      <table style={styles.table}>
        <tr style={styles.headRow}>
          <th scope="col">Токен</th>
          <th scope="col">Значение в PX</th>
        </tr>
        <tbody>
          {spacing?.main?.map(([key, value]) => {
            return (
              <tr key={key}>
                <td style={styles.keyColumn}>{key}</td>
                <td style={styles.valueColumn}>{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <h3>Фракции для сетки</h3>
      <table style={styles.table}>
        <tr style={styles.headRow}>
          <th scope="col">Токен</th>
          <th scope="col">Значение</th>
        </tr>
        <tbody>
          {spacing?.fractional?.map(([key, value]) => {
            return (
              <tr key={key}>
                <td style={styles.keyColumn}>{key}</td>
                <td style={styles.valueColumn}>{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
