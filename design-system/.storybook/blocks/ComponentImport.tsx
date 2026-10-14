import {
  DocsContext,
  extractTitle,
  Source,
} from '@storybook/addon-docs/blocks';
import { type FC } from 'react';
import { useContext } from 'react';

interface ComponentImportProps {
  packageName?: string;
  componentName?: string;
}

/**
 * Renders an import statement for a specified component from a given package.
 * This component generates a representation of code demonstrating how to import a component into your project.
 */
export const ComponentImport: FC<ComponentImportProps> = (props) => {
  let { componentName, packageName = 'package' } = props;

  const { storyById } = useContext(DocsContext);
  const { subcomponents = {}, title } = storyById();

  componentName = componentName ?? extractTitle(title);

  const components = [componentName, ...Object.keys(subcomponents)].join(', ');

  return <Source code={`import { ${components} } from '${packageName}'`} />;
};
