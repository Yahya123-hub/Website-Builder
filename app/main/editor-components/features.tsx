'use client';

import { Badge } from '@/components/ui/badge';
import { EditorElement, useEditor } from '../editor-provider';
import clsx from 'clsx';
import { Trash, Star, Settings, PentagonIcon, Grid } from 'lucide-react';
import React from 'react';

type Props = {
  element: EditorElement;
};

const FeaturesSection = (props: Props) => {
  const { dispatch, state } = useEditor();

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    });
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const handleUpdateContent = (field: 'feature_title' | 'feature_description' | 'feature1' | 'feature2' | 'feature3' | 'feature4', e: React.FocusEvent<HTMLDivElement>) => {
    const divElement = e.target as HTMLDivElement;
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...props.element,
          content: {
            ...props.element.content,
            [field]: divElement.innerText,
          },
        },
      },
    });
  };

  const styles = props.element.styles;

  return (
    <section
      style={styles}
      className={clsx(
        'p-6 text-black relative',
        {
          '!border-blue-500': state.editor.selectedElement.id === props.element.id,
          '!border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-4 left-1 rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <h2
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => handleUpdateContent('feature_title', e)}
        className="text-3xl font-bold mb-6 text-center"
      >
        {!Array.isArray(props.element.content) && props.element.content.title || 'Our Amazing Features'}
      </h2>
      <p
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => handleUpdateContent('feature_description', e)}
        className="text-lg mb-8 text-center"
      >
        {!Array.isArray(props.element.content) && props.element.content.description || 'Discover the innovative features we offer.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {['feature1', 'feature2', 'feature3', 'feature4'].map((featureKey, index) => (
          <div key={index} className="p-6 bg-white text-gray-800 rounded-lg shadow-lg flex flex-col items-center">
            {index === 0 && <Star size={40} className="mb-4 text-yellow-400" />}
            {index === 1 && <Settings size={40} className="mb-4 text-green-400" />}
            {index === 2 && <PentagonIcon size={40} className="mb-4 text-red-400" />}
            {index === 3 && <Grid size={40} className="mb-4 text-blue-400" />}
            <h3
              contentEditable={!state.editor.liveMode}
              //onBlur={(e) => handleUpdateContent(featureKey, e)}
              className="text-xl font-semibold mb-2"
            >
              {!Array.isArray(props.element.content) && props.element.content[featureKey] || `Feature ${index + 1}`}
            </h3>
            <p
              contentEditable={!state.editor.liveMode}
              //onBlur={(e) => handleUpdateContent(`${featureKey}Description`, e)}
              className="text-gray-600"
            >
              {!Array.isArray(props.element.content) && props.element.content[`${featureKey}Description`] || 'Description of the feature.'}
            </p>
          </div>
        ))}
      </div>

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-red-500 px-2.5 py-1 text-xs font-bold -top-4 -right-4 rounded-none rounded-t-lg text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </section>
  );
};

export default FeaturesSection;
