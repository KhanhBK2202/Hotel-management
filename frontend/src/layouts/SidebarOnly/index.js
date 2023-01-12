import Sidebar from '~/layouts/components/Sidebar';

function SidebarOnly({ children }) {
    return (
        <div>
            <div className="container">
                <Sidebar />
                <div className="content" style={{position: 'absolute', right: '0', width: 'calc(80% + 170px)', transition: 'width 0.5s'}}>{children}</div>
            </div>
        </div>
    );
}

export default SidebarOnly;
