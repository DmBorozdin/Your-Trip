# You trip

You trip - сервис по поиску отелей. Возможности приложения:

- помогает искать свободные отели на выбранные даты;
- показывает фотографии отеля;
- показывает рейтинг;
- показывает удобства в отеле и номерах;
- показывает цену на выбранную дату;
- показывает отзывы пользователей
- можно авторизоваться и добавлять понравивишиеся отели в изранное.
- сохраняет историю просмотров отелей для авторизованных пользователей

## В проекте реализованы следующие требования к функциональности:

### 1 уровень (необходимый минимум)

### React

- Функциональные компоненты c хуками в приоритете над классовыми
- Есть разделение на умные и глупые компоненты:
  - Умные: [Room](https://github.com/DmBorozdin/Your-Trip/blob/master/src/components/room/room.tsx), [Search](https://github.com/DmBorozdin/Your-Trip/blob/master/src/components/search/search.tsx)
  - Глупые: [Amenities](https://github.com/DmBorozdin/Your-Trip/blob/master/src/components/amenities/amenities.tsx)
- Есть рендеринг списков: [CardsList](https://github.com/DmBorozdin/Your-Trip/blob/master/src/components/cards-list/cards-list.tsx), [HistoryList](https://github.com/DmBorozdin/Your-Trip/blob/master/src/components/history/history.tsx), [ReviewsList](https://github.com/DmBorozdin/Your-Trip/blob/master/src/components/reviews/reviews.tsx)
- Реализована хотя бы одна форма:
  - Кастомная: [Sign in](https://github.com/DmBorozdin/Your-Trip/blob/master/src/components/login/login.tsx), [Sign up](https://github.com/DmBorozdin/Your-Trip/blob/master/src/components/sign-up/sign-up.tsx)
  - Ant Design: [SearchForm](https://github.com/DmBorozdin/Your-Trip/blob/master/src/components/search-form/search-form.tsx)
- Есть применение Контекст API: [Reviews](https://github.com/DmBorozdin/Your-Trip/blob/master/src/components/room/room.tsx)
- Есть применение предохранителя: [ErrorBoundary](https://github.com/DmBorozdin/Your-Trip/blob/master/src/index.tsx)
- Есть хотя бы один кастомный хук: [useHistory](https://github.com/DmBorozdin/Your-Trip/blob/master/src/hooks/use-history.ts)
- Хотя бы несколько компонентов используют PropTypes: [Card](https://github.com/DmBorozdin/Your-Trip/blob/master/src/components/card/card.tsx), [Amenities](https://github.com/DmBorozdin/Your-Trip/blob/master/src/components/amenities/amenities.tsx)
- Поиск не должен триггерить много запросов к серверу: [SearchForm](https://github.com/DmBorozdin/Your-Trip/blob/master/src/components/search-form/search-form.tsx)
- Есть применение lazy + Suspense: [lazy + Suspense](https://github.com/DmBorozdin/Your-Trip/blob/master/src/components/app/App.tsx)

### Redux

- Используем Modern Redux with Redux Toolkit: [Store](https://github.com/DmBorozdin/Your-Trip/blob/master/src/store/store.ts)
- Используем слайсы: [usersSlice](https://github.com/DmBorozdin/Your-Trip/blob/master/src/store/users/users.ts)
- Есть хотя бы одна кастомная мидлвара: [userMiddleware](https://github.com/DmBorozdin/Your-Trip/blob/master/src/store/middlewares/user.ts)
- Используется RTK Query: [apiSlice](https://github.com/DmBorozdin/Your-Trip/blob/master/src/services/apiSlice.ts)
- Используется Transforming Responses: [apiSlice](https://github.com/DmBorozdin/Your-Trip/blob/master/src/services/apiSlice.ts)

### 2 уровень (необязательный)

- Используeтся TypeScript
- Используются мемоизированные селекторы (createSelector): [getFavorites, getAuthUser, getHistory](https://github.com/DmBorozdin/Your-Trip/blob/master/src/store/users/selector.ts)

### Дополнительно использовано:

- Библиотека Ant Design для [SearchForm](https://github.com/DmBorozdin/Your-Trip/blob/master/src/components/search-form/search-form.tsx), Skeleton, Preloader, Error Message
- Библиотека Redux-persist для синхронизации LocalStorage с Redux: [Store](https://github.com/DmBorozdin/Your-Trip/blob/master/src/store/store.ts)
- SCSS
