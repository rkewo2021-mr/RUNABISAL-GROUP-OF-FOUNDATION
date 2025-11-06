
import { Template, AnimationStyle } from './types';

export const TEMPLATES: Template[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk City',
    description: 'Become a futuristic hero in a neon-lit metropolis.',
    prompt: 'A cinematic shot of a person described as {faceDescription}, as a cyberpunk hero standing on a skyscraper rooftop overlooking a neon-lit, rainy city at night.',
    imageUrl: 'https://picsum.photos/seed/cyberpunk/400/500',
  },
  {
    id: 'fantasy',
    name: 'Fantasy Explorer',
    description: 'Journey through an enchanted forest with magical creatures.',
    prompt: 'A person described as {faceDescription}, as a fantasy explorer in an enchanted forest, with glowing mushrooms and mystical creatures in the background, cinematic fantasy style.',
    imageUrl: 'https://picsum.photos/seed/fantasy/400/500',
  },
  {
    id: 'popstar',
    name: '80s Pop Star',
    description: 'Shine on stage in a vibrant, retro music video.',
    prompt: 'A person described as {faceDescription}, as an 80s pop star performing on a brightly lit stage, with retro graphics and lens flares, music video style.',
    imageUrl: 'https://picsum.photos/seed/popstar/400/500',
  },
  {
    id: 'astronaut',
    name: 'Space Astronaut',
    description: 'Float in zero-gravity with a view of Earth.',
    prompt: 'An astronaut, described as {faceDescription} with their helmet visor showing their face, floating in space with planet Earth in the background, ultra realistic, cinematic.',
    imageUrl: 'https://picsum.photos/seed/astronaut/400/500',
  },
];

export const ANIMATION_STYLES: AnimationStyle[] = [
  { id: 'anime', name: 'Vibrant Anime', promptSuffix: 'in a vibrant, high-detail anime style.' },
  { id: 'cartoon', name: 'Modern Cartoon', promptSuffix: 'in a modern 3D cartoon animation style, like a Pixar movie.' },
  { id: 'pixel', name: 'Pixel Art', promptSuffix: 'as 16-bit pixel art, retro video game style.' },
  { id: 'watercolor', name: 'Watercolor', promptSuffix: 'as a beautiful watercolor painting.' },
];

export const VIDEO_GENERATION_MESSAGES: string[] = [
  "Warming up the digital canvas...",
  "Gathering stardust and pixels...",
  "Teaching the AI about cinematography...",
  "Directing your digital scene...",
  "Rendering your masterpiece, frame by frame...",
  "This can take a few minutes, hang tight!",
  "Adding the final touches of magic...",
  "Almost there, preparing for the premiere...",
];
