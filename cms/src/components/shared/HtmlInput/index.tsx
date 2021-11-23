import dynamic from 'next/dynamic';
import React, { Ref, useImperativeHandle, useRef } from 'react';
import { useController } from 'react-hook-form';

interface StateProps {
  control?,
  name: string,
  defaultValue?: string
}
interface DispatchProps { }
interface OwnProps {
  id: string;
  setContent?: any;
}

interface HandleFunctions {
  onSubmit: Function;
  ref?: Ref<HandleFunctions>;
}

type Props = StateProps & DispatchProps & React.PropsWithChildren<OwnProps>;

export const SunEditor = dynamic(() => import('suneditor-react'), { ssr: false });

export const SunEditorFunc: React.ForwardRefRenderFunction<HandleFunctions, Props> = ({
  id, control, name, defaultValue, setContent
}, ref) => {
  const child1 = useRef<HTMLDivElement>();

  useImperativeHandle(ref, () => ({
    onSubmit() {
      const arrElem = child1.current.querySelector('.se-wrapper-wysiwyg').innerHTML;
      return arrElem;
    },
  }));

  const {
    field: {
      value,
      ...inputProps
    },
    fieldState: {
      invalid,
      isTouched,
      isDirty
    },
    formState: {
      touchedFields,
      dirtyFields
    }
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: defaultValue || ''
  });

  return (
    <div ref={child1} className="w-100">
      <SunEditor
        {...inputProps}
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
        setContents={setContent}
        defaultValue={value}
        setDefaultStyle="font-size: 14px; font-family: Rawline; height: auto; max-height: 500px;"
        lang="pt_br"
        width="100%"
      />
    </div>
  );
};
// export SunEditorElem;
export const SunEditorElem = React.forwardRef(SunEditorFunc);
