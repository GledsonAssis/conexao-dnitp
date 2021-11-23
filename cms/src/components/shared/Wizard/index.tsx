import React, {
  Children,
  ForwardRefRenderFunction,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import BRWizard from './wizard';

import { WizardBtnTrigger } from './WizardProgressBtn';
import { WizardPanel } from './WizardProgressPanel';
import { WizardPanelContent } from './WizardPanelContent';
import { WizardPanelBtn } from './WizardPanelBtn';

export { WizardBtnTrigger, WizardPanel, WizardPanelContent, WizardPanelBtn }

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'br-multiple'?: string;
  }
}

interface StateProps { }
interface DispatchProps { }
interface OwnProps extends React.AllHTMLAttributes<HTMLDivElement> { }

interface Handle { }

type Props = StateProps & DispatchProps & React.PropsWithChildren<OwnProps>;

export const WizardElement: ForwardRefRenderFunction<Handle, Props> = (
  {
    children,
    ...props
  },
  ref,
) => {
  const child1 = useRef<HTMLDivElement>();
  const [element, setElement] = useState<BRWizard>();

  useEffect(() => {
    if (child1.current && !child1.current.hasAttribute('br-wizard-att')) {
      setElement(new BRWizard('br-wizard', child1.current));
      // console.log('Aqui')
    }
    // eslint-disable-next-line
  }, [children]);

  function renderTrigger(item: any, classTrigger: string, nameKey: string) {
    if (item.type.name === classTrigger && item.props.nameKey === nameKey) {
      return item;
    }
  }

  function renderPanel(item: any, classTrigger: string, nameKey: string) {
    if (item.type.name === classTrigger && item.props.nameKey === nameKey) {
      return item;
    }
  }

  return (
    <div className="br-wizard" ref={child1} {...{ collapsed: "collapsed", step: "1" }} >
      <div className="wizard-progress">
        {Children.map(children, (item: any) => renderTrigger(item, WizardBtnTrigger.name, 'progress-btn'))}
      </div>
      <div className="wizard-form">
        {Children.map(children, (item: any) => renderPanel(item, WizardPanel.name, 'progress-panel'))}
      </div>
    </div>
  );
};

export const Wizard = React.forwardRef(WizardElement);

export default Wizard;
