import type { Of } from '@storybook/addon-docs/blocks';
import { DocsContext, useOf } from '@storybook/addon-docs/blocks';
import type { FC } from 'react';
import { useContext } from 'react';

import { DocsStory } from './DocsStory';

/**
 * This doc block provides a brief description "Basic usage" of what the component does, along with an example of how it's used.
 */

interface PrimaryProps {
  /**
   * Specify where to get the primary story from.
   */
  of?: Of;
}

export const Primary: FC<PrimaryProps> = (props) => {
  const { of } = props;
  if ('of' in props && of === undefined) {
    throw new Error(
      'Unexpected `of={undefined}`, did you mistype a CSF file reference?',
    );
  }

  const { csfFile } = useOf(of || 'meta', ['meta']);
  const context = useContext(DocsContext);

  const primaryStory = context.componentStoriesFromCSFFile(csfFile)[0];

  return primaryStory ? (
    <DocsStory
      of={primaryStory.moduleExport}
      expanded={false}
      __primary
      withToolbar
    />
  ) : null;
};
