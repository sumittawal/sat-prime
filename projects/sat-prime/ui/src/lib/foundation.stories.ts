import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

const meta: Meta = {
  title: 'Foundation/Theme',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: () => ({
    moduleMetadata: {
      imports: [ButtonModule, InputTextModule, TagModule],
    },
    styles: [
      `
        .sat-foundation {
          display: grid;
          gap: 1rem;
          min-width: 32rem;
        }
        .sat-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
        }
      `,
    ],
    template: `
      <div class="sat-foundation">
        <div class="sat-row">
          <p-button label="Primary"></p-button>
          <p-button label="Success" severity="success"></p-button>
          <p-button label="Info" severity="info"></p-button>
          <p-button label="Warn" severity="warn"></p-button>
          <p-button label="Danger" severity="danger"></p-button>
        </div>
        <div class="sat-row">
          <input pInputText placeholder="InputText" />
          <p-tag value="Success" severity="success"></p-tag>
          <p-tag value="Info" severity="info"></p-tag>
          <p-tag value="Warn" severity="warn"></p-tag>
          <p-tag value="Danger" severity="danger"></p-tag>
        </div>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj;

export const Tokens: Story = {};
