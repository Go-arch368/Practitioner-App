// app/layout.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
// If using CSS modules (recommended):

import "@/styles/CustomStyles.css"
import "../../styles/CustomStyles.css"



export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="main-layout">
          <div className="main-header">
          <Header/>
          </div>
          <div className="main-content" style={{ flex: 1, overflowY: 'auto' }}>
            {children}
          </div>
           <Footer /> 
        </div>
      </body>
    </html>
  );
}
