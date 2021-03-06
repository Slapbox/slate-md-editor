import * as React from 'react';
import { Editor } from 'slate-react'
import {Row, Col} from 'antd';
import beautify from 'js-beautify';
import {Value} from 'slate';
import {State} from 'markup-it';
import Prism from 'prismjs';
import EditPrism from 'slate-prism';
import EditBlockquote from 'slate-edit-blockquote';
import EditList from 'slate-edit-list'
import PluginEditCode from 'slate-edit-code';
import markdown from 'markup-it/lib/markdown';
import html from 'markup-it/lib/html';
import MarkdownPlugin from '../src';
import DEFAULT_LIST from '../src/constant/list';
import readme from '../README.md';

import "github-markdown-css";
import "prismjs/themes/prism.css"
import 'antd/dist/antd.css';

const plugins = [
  MarkdownPlugin(),
  EditPrism({
    onlyIn: node => node.type === 'code_block',
    getSyntax: node => node.data.get('syntax')
  }),
  PluginEditCode({
    onlyIn: node => node.type === 'code_block'
  }),
  EditBlockquote(),
  EditList(DEFAULT_LIST)
];


const mdParser = State.create(markdown);
const htmlSerializer = State.create(html);

class App extends React.Component {
  constructor(props) {
    super(props);
    const document = mdParser.deserializeToDocument(readme)
    
    this.state = {
      value: Value.create({document})
    };
  }

  componentDidUpdate() {
    Prism.highlightAllUnder(document.getElementById('root'));
  }

  onChange = ({value}) => {
    this.setState({
      value,
    });
  };

  render() {
    const { value } = this.state;
    const htmlStr = htmlSerializer.serializeDocument(value.document)
    const beautyHTML = beautify.html(htmlStr, { indent_size: 2, space_in_empty_paren: true })
    return (
      <Row>
        <Col span={12} style={{borderRight: '1px solid #DDD', minHeight: '100vh'}}>
          <div
            className="markdown-body"
            style={{padding: '5px 0 5px 10px'}}>
            <Editor
              value={value}
              plugins={plugins}
              onChange={this.onChange}
            />
          </div>
        </Col>
        <Col span={12} style={{padding: '10px'}}>
          <h3>Serialized HTML</h3>
          <pre>
            <code className="language-markup">
              {beautyHTML}
            </code>
          </pre>
        </Col>
      </Row>
    );
  }
}

export default App;
