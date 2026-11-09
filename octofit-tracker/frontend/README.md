# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## OctoFit 실행

Codespaces에서는 `octofit-tracker/frontend/.env.local`에 `VITE_CODESPACE_NAME`을 정의해야 합니다. `.env.local.example`을 복사한 뒤 `your-codespace-name`을 현재 Codespace 이름으로 바꾸세요.

```env
VITE_CODESPACE_NAME=your-codespace-name
```

이 값이 있으면 프런트엔드는 `https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/`를 호출합니다. 값이 비어 있거나 설정되지 않은 경우 `http://localhost:8000/api/`를 사용해 `undefined` 호스트 요청을 방지합니다. 선택 사항인 `VITE_API_BASE_URL`로 API 기본 주소를 직접 지정할 수도 있습니다.

```bash
npm run dev --prefix octofit-tracker/frontend
```

개발 서버는 포트 `5173`에서 실행됩니다.
