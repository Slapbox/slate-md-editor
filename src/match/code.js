// @flow
import {Mark, Range} from 'slate';
import type {Change, Text} from 'slate';
import trailingSpace from '../utils/trailingSpace';

export default function (currentTextNode: Text, matched: any, change: Change) {
  const matchedLength = matched[0].length;
  return change
    .deleteAtRange(Range.create({
      anchorKey: currentTextNode.key,
      focusKey: currentTextNode.key,
      anchorOffset: matched.index,
      focusOffset: matched.index + matchedLength
    }))
    .call(trailingSpace, currentTextNode, matched.index)
    .insertTextByKey(
      currentTextNode.key,
      matched.index,
      matched[0].replace(/`/g, ""),
      [Mark.create({type: 'CODE'})]
    )
    .call(trailingSpace, currentTextNode, matched.index)
}