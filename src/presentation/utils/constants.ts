const SOUNDS = [
  "/sounds/334534__teddy_frost__piano-a4-sound.wav",
  "/sounds/334536__teddy_frost__piano-normal-d4.wav",
  "/sounds/334537__teddy_frost__c5.wav",
  "/sounds/334538__teddy_frost__c4.wav",
  "/sounds/334539__teddy_frost__b4.wav",
  "/sounds/334540__teddy_frost__g4.wav",
  "/sounds/334541__teddy_frost__f4.wav",
  "/sounds/334542__teddy_frost__e4.wav",
];

function getRandomSound(index: number) {
  return SOUNDS[index % SOUNDS.length];
}

export const TECHNOLOGIES = [
  { title: "Next.js", description: "React framework for production.", sound: getRandomSound(0) },
  { title: "Nuxt.js", description: "Vue.js framework for SSR.", sound: getRandomSound(1) },
  { title: "Gatsby", description: "React-based static site generator.", sound: getRandomSound(2) },
  { title: "Flutter", description: "UI toolkit for building natively compiled apps.", sound: getRandomSound(3) },
  { title: "Node.js", description: "JavaScript runtime built on Chrome's V8.", sound: getRandomSound(4) },
  { title: "Dart", description: "Programming language optimized for UI.", sound: getRandomSound(5) },
  { title: "Tailwind CSS", description: "Utility-first CSS framework.", sound: getRandomSound(6) },
  { title: "Bootstrap", description: "Popular CSS framework.", sound: getRandomSound(7) },
  { title: "Foundation", description: "Responsive front-end framework.", sound: getRandomSound(8) },
  { title: "Bulma", description: "Modern CSS framework.", sound: getRandomSound(9) },
  { title: "Materialize", description: "Material design CSS framework.", sound: getRandomSound(10) },
  { title: "Semantic UI", description: "UI framework for theming.", sound: getRandomSound(11) },
  { title: "Ant Design", description: "Enterprise-class UI design language.", sound: getRandomSound(12) },
  { title: "Chakra UI", description: "Simple, modular React UI library.", sound: getRandomSound(13) },
  { title: "Tanstack Query", description: "Powerful asynchronous state management.", sound: getRandomSound(14) },
  { title: "Emotion", description: "CSS-in-JS library.", sound: getRandomSound(15) },
  { title: "React", description: "A JavaScript library for building UIs.", sound: getRandomSound(16) },
  { title: "Angular", description: "Web application framework.", sound: getRandomSound(17) },
  { title: "Vue.js", description: "Progressive JavaScript framework.", sound: getRandomSound(18) },
  { title: "Svelte", description: "Cybernetically enhanced web apps.", sound: getRandomSound(19) },
  { title: "Redux", description: "State container for JS apps.", sound: getRandomSound(20) },
  { title: "MobX", description: "Simple, scalable state management.", sound: getRandomSound(21) },
  { title: "RxJS", description: "Reactive programming library.", sound: getRandomSound(22) },
  { title: "GraphQL", description: "Query language for APIs.", sound: getRandomSound(23) },
  { title: "Apollo", description: "GraphQL implementation.", sound: getRandomSound(24) },
  { title: "Relay", description: "GraphQL client for React.", sound: getRandomSound(25) },
  { title: "Webpack", description: "Module bundler.", sound: getRandomSound(26) },
  { title: "Parcel", description: "Blazing fast, zero config web app bundler.", sound: getRandomSound(27) },
  { title: "Rollup", description: "Module bundler for JavaScript.", sound: getRandomSound(28) },
  { title: "Babel", description: "JavaScript compiler.", sound: getRandomSound(29) },
  { title: "ESLint", description: "Pluggable JavaScript linter.", sound: getRandomSound(30) },
  { title: "Prettier", description: "Opinionated code formatter.", sound: getRandomSound(31) },
  { title: "Jest", description: "Delightful JavaScript testing.", sound: getRandomSound(32) },
  { title: "Mocha", description: "Feature-rich JS test framework.", sound: getRandomSound(33) },
  { title: "Cypress", description: "Fast, easy and reliable testing.", sound: getRandomSound(34) },
  { title: "Storybook", description: "UI component explorer.", sound: getRandomSound(35) },
  { title: "Three.js", description: "3D JavaScript library.", sound: getRandomSound(36) },
  { title: "D3.js", description: "Data-Driven Documents.", sound: getRandomSound(37) },
  { title: "Chart.js", description: "Simple HTML5 charts.", sound: getRandomSound(38) },
  { title: "Highcharts", description: "Interactive JavaScript charts.", sound: getRandomSound(39) },
  { title: "React Native", description: "Build native apps with React.", sound: getRandomSound(40) },
  { title: "Ionic", description: "Cross-platform mobile app framework.", sound: getRandomSound(41) },
  { title: "Xamarin", description: ".NET app platform for mobile.", sound: getRandomSound(42) },
  { title: "Unity", description: "Game engine and IDE.", sound: getRandomSound(43) },
  { title: "Unreal Engine", description: "Game engine by Epic Games.", sound: getRandomSound(44) },
  { title: "TensorFlow", description: "Machine learning framework.", sound: getRandomSound(45) },
  { title: "PyTorch", description: "Deep learning platform.", sound: getRandomSound(46) },
  { title: "Astro", description: "Static site builder.", sound: getRandomSound(47) },
  { title: "OpenCV", description: "Computer vision library.", sound: getRandomSound(48) },
  { title: "Blender", description: "3D creation suite.", sound: getRandomSound(49) },
  { title: "Babylon.js", description: "Powerful 3D engine.", sound: getRandomSound(50) },
  { title: "A-Frame", description: "Web framework for VR.", sound: getRandomSound(51) },
  { title: "Expo", description: "Framework for React Native.", sound: getRandomSound(52) },
  { title: "SwiftUI", description: "UI toolkit for Apple platforms.", sound: getRandomSound(53) },
  { title: "Kotlin", description: "Modern programming language.", sound: getRandomSound(54) },
  { title: "ARKit", description: "Apple's AR development kit.", sound: getRandomSound(55) },
  { title: "ARCore", description: "Google's AR development kit.", sound: getRandomSound(56) },
  { title: "Playwright", description: "End-to-end testing framework.", sound: getRandomSound(57) },
  { title: "Cypress", description: "Fast, easy and reliable testing.", sound: getRandomSound(58) },
  { title: "Preact", description: "Fast 3kB React alternative.", sound: getRandomSound(59) },
  { title: "WebGL", description: "JavaScript API for rendering 3D.", sound: getRandomSound(60) },
  { title: "WebXR", description: "Web API for VR and AR.", sound: getRandomSound(61) },
  { title: "WebGPU", description: "Modern graphics API for the web.", sound: getRandomSound(62) },
]; 