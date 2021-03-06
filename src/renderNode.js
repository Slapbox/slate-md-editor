// @flow
import React from 'react';
import commonNode from '@canner/slate-editor-renderer/lib/commonNode';
import linkNode from '@canner/slate-editor-renderer/lib/linkNode';

export default (props: any) => {
  const { node } = props;
  switch (node.type.toLowerCase()) {
    case 'header_one':
      return commonNode('h1')(props);
    case 'header_two':
      return commonNode('h2')(props);
    case 'header_three':
      return commonNode('h3')(props);
    case 'header_four':
      return commonNode('h4')(props);
    case 'header_five':
      return commonNode('h5')(props);
    case 'header_six':
      return commonNode('h6')(props);
    case 'paragraph':
      return commonNode('p')(props);
    case 'blockquote':
      return commonNode('blockquote')(props);
    case 'unordered_list':
      return commonNode('ul')(props);
    case 'ordered_list':
      return commonNode('ol')(props);
    case 'list_item':
      return commonNode('li')(props);
    case 'hr':
      return <hr/>;
    case 'code_block':
      return (
        <pre>
          <code {...props.attributes}>
            {props.children}
          </code>
        </pre>
      );
    case 'code_line':
      return <div {...props.attributes}>{props.children}</div>
    case 'image':
      const src = node.data.get('src');
      return (
        <img
        {...props.attributes}
        src={src}/>
      );
    case 'link':
      return linkNode()(props);
  }
}