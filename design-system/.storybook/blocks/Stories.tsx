import { DocsContext } from '@storybook/addon-docs/blocks';
import type { FC } from 'react';
import { useContext } from 'react';

import { DocsStory } from './DocsStory';

interface StoriesProps {
  includePrimary?: boolean;
}

/**
 * A collection of stories representing different states or variations of a component.
 * Stories are used in Storybook to showcase the usage and behavior of components in various scenarios.
 *
 * This doc block provides an overview of what Storybook stories are and how they're typically used.
 * It also includes an example of how stories are defined in a Storybook stories file.
 */

export const Stories: FC<StoriesProps> = ({ includePrimary = true }) => {
  const { componentStories, projectAnnotations, getStoryContext } =
    useContext(DocsContext);

  let stories = componentStories();
  const { stories: { filter } = { filter: undefined } } =
    projectAnnotations.parameters?.docs || {};

  if (filter) {
    stories = stories.filter((story) => filter(story, getStoryContext(story)));
  }

  if (!includePrimary) stories = stories.slice(1);

  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <>
      {stories.map(
        (story) =>
          story && (
            <DocsStory
              key={story.id}
              of={story.moduleExport}
              expanded
              __forceInitialArgs
            />
          ),
      )}
    </>
  );
};
