import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import { DropDownPage, MainPage, SliderPage } from '../pages';

export const Router: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="slider" element={<SliderPage />} />
          <Route path="dropmenu" element={<DropDownPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
