// Copyright 2018-2020 @paritytech/Nomidot authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ApiRxContext } from '@substrate/context';
import {
  AddressSummary,
  Icon,
  List,
  Margin,
  Stacked,
  StackedHorizontal,
  WithSpaceAround,
} from '@substrate/ui-components';
import { navigate } from 'gatsby';
import React, { useContext } from 'react';

import {
  removeCartItem,
  stripAddressFromCartItem,
} from '../../util/cartHelpers';
import { Button, SubHeader } from '../index';

interface Props {
  cartItems: string[];
  cartItemsCount: number;
}

const CartItems = (props: Props): React.ReactElement => {
  const { cartItems, cartItemsCount } = props;

  const { api } = useContext(ApiRxContext);

  const renderCartEmpty = (): React.ReactElement => {
    return (
      <Stacked>
        <SubHeader>Cart Empty</SubHeader>
        <p>you should add some validators to nominate...</p>
        <Button neutral onClick={(): Promise<void> => navigate('/validators')}>
          Take Me There!
        </Button>
      </Stacked>
    );
  };

  const removeItemFromCart = ({
    currentTarget: {
      dataset: { key },
    },
  }: React.MouseEvent<HTMLButtonElement>): void => {
    if (key) {
      removeCartItem(key, cartItemsCount);
    } else {
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <List animated relaxed>
      {cartItems.length
        ? cartItems.map((item: string) => {
            const address = stripAddressFromCartItem(item);

            return (
              <List.Item key={item}>
                <WithSpaceAround>
                  <StackedHorizontal>
                    <AddressSummary
                      address={address}
                      api={api}
                      noPlaceholderName
                      orientation='horizontal'
                      size='small'
                    />
                    <Margin left />
                    <Icon
                      name='close'
                      link
                      onClick={removeItemFromCart}
                      data-key={item}
                    />
                  </StackedHorizontal>
                </WithSpaceAround>
              </List.Item>
            );
          })
        : renderCartEmpty()}
    </List>
  );
};

export default CartItems;
