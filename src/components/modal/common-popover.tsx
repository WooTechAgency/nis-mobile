import React, { ReactNode } from 'react';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import { PublicPopoverProps } from 'react-native-popover-view/dist/Popover';

interface Props extends PublicPopoverProps {
  visible: boolean;
  toggleVisible: () => void;
  content: ReactNode;
  radius?: number;
}
export default function CommonPopover(props: Props) {
  const { visible, toggleVisible, children, content, radius = 12 } = props;
  return (
    <Popover
      isVisible={visible}
      onRequestClose={toggleVisible}
      offset={4}
      placement={PopoverPlacement.AUTO}
      from={children}
      arrowSize={{ width: -1, height: -1 }}
      backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
      {...props}
      popoverStyle={[{ borderRadius: radius }, props.popoverStyle]}
    >
      {content}
    </Popover>
  );
}
