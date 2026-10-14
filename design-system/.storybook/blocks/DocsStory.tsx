import type { DocsStoryProps as SBDocsStoryProps } from '@storybook/addon-docs/blocks';
import {
  Anchor,
  Canvas,
  Description,
  Subheading,
  useOf,
} from '@storybook/addon-docs/blocks';
import type { FC } from 'react';

/**
 * Renders an anchor block to create a linkable section within Storybook.
 * This component generates an anchor block with a unique ID based on the provided story ID.
 */

interface DocsStoryProps extends SBDocsStoryProps {
  sourceState?: 'hidden' | 'shown' | 'none';
}

export const DocsStory: FC<DocsStoryProps> = ({
  of,
  expanded = true,
  withToolbar: withToolbarProp = false,
  sourceState,
  __forceInitialArgs = false,
  __primary = false,
}) => {
  const { story } = useOf(of || 'story', ['story']);

  // use withToolbar from parameters or default to true in autodocs
  const withToolbar =
    story.parameters.docs?.canvas?.withToolbar ?? withToolbarProp;

  return (
    <Anchor storyId={story.id}>
      {expanded && <Subheading>{story.name}</Subheading>}
      <div>
        <Canvas
          of={of}
          withToolbar={withToolbar}
          sourceState={sourceState}
          story={{ __forceInitialArgs, __primary }}
          source={{ __forceInitialArgs }}
        />
        {expanded && <Description of={of} />}
      </div>
    </Anchor>
  );
};
