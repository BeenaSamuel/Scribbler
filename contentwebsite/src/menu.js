
import React from 'react'; 
import { Menu } from 'primereact/menu';
import { Link } from 'react-router-dom';


export default function MenuBar() {
    let items = [
        {label: 'Home', icon: 'pi pi-fw pi-home',to: '/' },
        {label: 'Poem', icon: 'pi pi-fw pi-pencil',to: '/pages/Poem'}
    ];

    return (
        <div className="container-fluid">
        <Menu model={items.map(item => ({ ...item, command: () => window.location.href = item.to }))} /></div>
    )
}