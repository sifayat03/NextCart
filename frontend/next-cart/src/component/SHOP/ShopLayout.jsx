const ShopLayout = ({
  sidebar,
  toolbar,
  children,
}) => {
  return (
    <section className="bg-[#fafafa]">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 lg:grid-cols-[290px_1fr]">

          {/* Sidebar */}

          <aside className="hidden lg:block">

            <div className="sticky top-28">

              {sidebar}

            </div>

          </aside>

          {/* Content */}

          <main>

            {/* Toolbar */}

            <div className="mb-8">

              {toolbar}

            </div>

            {/* Products */}

            {children}

          </main>

        </div>

      </div>

    </section>
  );
};

export default ShopLayout;