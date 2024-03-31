import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch } from 'utils/hook';
import { getSingleAssets } from 'store/thunks/data';
import { getService } from 'store/thunks/service';

interface MenuItem {
  name: string;
}

interface ContentComponentProps {
  menuItems: MenuItem[];
}

const ContentComponent: React.FC<ContentComponentProps> = ({ menuItems }) => {
  const { state } = useLocation();
  const url = state ? state.url : '';
  const [assetContents, setAssetContents] = useState<string[]>([]); // Состояние для хранения содержимого активов
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchAssetContents = async () => {
      const contents: string[] = [];
      try {
        for (let i = 0; i < menuItems.length; i++) {
          const response = await dispatch(getSingleAssets({ url, otherParams: { id: i } })); // Передаем id для получения соответствующего актива
          contents.push(response.payload); // Добавляем содержимое актива в массив
        }
        setAssetContents(contents); // Устанавливаем содержимое активов в состояние
      } catch (e) {
        console.error("Ошибка при загрузке данных актива:", e);
      }
    };

    fetchAssetContents();
  }, [dispatch, id, menuItems, url]);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {menuItems.map((menuItem, index) => (
          <Tab key={index} label={menuItem.name} />
        ))}
      </Tabs>
      {assetContents.map((content, index) => (
        <TabPanel key={index} value={value} index={index}>
          {content}
        </TabPanel>
      ))}
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default ContentComponent;
