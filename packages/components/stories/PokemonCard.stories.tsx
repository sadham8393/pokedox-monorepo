import type { Meta, StoryObj } from '@storybook/react';
import { PokemonCard } from '../PokemonCard';

const meta: Meta<typeof PokemonCard> = {
  title: 'Components/PokemonCard',
  component: PokemonCard,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof PokemonCard>;

export const Default: Story = {
  args: {
    name: 'pikachu',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    types: ['electric'],
    height: '0.4 m',
    weight: '6.0 kg',
    baseExperience: 112,
  },
};

export const WithMultipleTypes: Story = {
  args: {
    name: 'bulbasaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    types: ['grass', 'poison'],
    height: '0.7 m',
    weight: '6.9 kg',
    baseExperience: 64,
  },
};
