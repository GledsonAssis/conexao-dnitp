import dynamic from 'next/dynamic';
import React, { Ref, useImperativeHandle, useRef, Children } from 'react';
import { useForm } from 'react-hook-form';
import SunEditorCore from "suneditor/src/lib/core";

interface StateProps { }
interface DispatchProps { }
interface OwnProps {
  id: string;
  handleChange: (event: FocusEvent, editorContents: string) => void
}

interface HandleFunctions {
  onSubmit: Function;
  ref?: Ref<HandleFunctions>;
}

type Props = StateProps & DispatchProps & React.PropsWithChildren<OwnProps>;

export const SunEditor = dynamic(() => import('suneditor-react'), { ssr: false });

export const SunEditorFunc: React.ForwardRefRenderFunction<HandleFunctions, Props> = ({ id, handleChange }, ref) => {
  const child1 = useRef<HTMLDivElement>();

  useImperativeHandle(ref, () => ({
    onSubmit() {
      const arrElem = child1.current.querySelector('.se-wrapper-wysiwyg').innerHTML;
      return arrElem;
      // const stringBodySent = Children.toArray(arrElem).join('').toString();
    },
  }));

  // function handleChange(content: string) {
  //   console.log(content); //Get Content Inside Editor
  // }

  return (
    <div ref={child1} className="w-100">
      <SunEditor
        onBlur={handleChange}
        setOptions={{
          popupDisplay: 'local',
          resizingBar: false,
          fontSize: [8, 10, 14, 18, 24, 36],
          buttonList: [
            ['undo', 'redo'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            [':p-More Paragraph-default.more_paragraph', 'fontSize', 'formatBlock', 'blockquote'],
            ['fontColor', 'hiliteColor', 'removeFormat'],
            ['outdent', 'indent'],
            ['link', 'table'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
          ],
        }}
        name={`SunEditor_${id}`}
        setDefaultStyle="font-size: 14px; font-family: Rawline;"
        lang="pt_br"
        width="100%"
      />
    </div>
  );
};
// export SunEditorElem;
export const SunEditorElem = React.forwardRef(SunEditorFunc);
