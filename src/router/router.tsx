import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import { DropDownPage, MainPage, SliderPage, AlertPage, TablePage, PaginationPage, TreePage } from '../pages';

export const Router: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="slider" element={<SliderPage />} />
          <Route path="dropmenu" element={<DropDownPage />} />
          <Route path="alert" element={<AlertPage />} />
          <Route path="table" element={<TablePage />} />
          <Route path="pagination" element={<PaginationPage />} />
          <Route path="tree" element={<TreePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
