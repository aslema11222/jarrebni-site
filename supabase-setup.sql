-- ============================================================
--  JARREBNI — Supabase Schema
--  Coller dans : projet Supabase > SQL Editor > New query
--  Puis cliquer RUN
-- ============================================================

-- 1. TABLES ------------------------------------------------

CREATE TABLE IF NOT EXISTS products (
  id          TEXT PRIMARY KEY,
  category    TEXT NOT NULL CHECK (category IN ('fruits', 'veggies')),
  emoji       TEXT    DEFAULT '🛒',
  image       TEXT    DEFAULT '',
  name        TEXT    NOT NULL,
  description TEXT    DEFAULT '',
  price       TEXT    NOT NULL,
  unit        TEXT    DEFAULT 'كغ',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  phone         TEXT NOT NULL,
  address       TEXT NOT NULL,
  products_text TEXT    DEFAULT '',
  notes         TEXT    DEFAULT '',
  status        TEXT    DEFAULT 'new',
  total         TEXT    DEFAULT '0',
  order_date    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id          TEXT PRIMARY KEY,
  name        TEXT    NOT NULL,
  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text        TEXT    NOT NULL,
  review_date TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT DEFAULT ''
);

-- 2. DONNÉES PAR DÉFAUT ------------------------------------

INSERT INTO settings (key, value) VALUES
  ('phone',     '+216 XX XXX XXX'),
  ('whatsapp',  '216XXXXXXXX'),
  ('promoText', '🔥 عرض الأسبوع: توصيل مجاني في بنزرت الشمالية!'),
  ('hours',     'السبت - الخميس: 8:00ص - 8:00م' || chr(10) || 'الجمعة: مغلق')
ON CONFLICT (key) DO NOTHING;

INSERT INTO products (id, category, emoji, name, description, price, unit) VALUES
  ('f1','fruits','🍊','برتقال طازج','غني بفيتامين C، حلو ولذيذ','1.5','كغ'),
  ('f2','fruits','🍎','تفاح أحمر','طازج ومقرمش من المزرعة مباشرة','3','كغ'),
  ('f3','fruits','🍌','موز','ناضج بشكل مثالي، غني بالبوتاسيوم','2','كغ'),
  ('f4','fruits','🍇','عنب أخضر','حبات كبيرة، حلوة وعصيرية','4','كغ'),
  ('f5','fruits','🍓','فراولة','طازجة، حمراء ولذيذة','5','كغ'),
  ('f6','fruits','🥭','مانجو','استوائية، ناضجة وعطرية','6','كغ'),
  ('f7','fruits','🍋','ليمون','طازج، غني بالفيتامينات','1.2','كغ'),
  ('f8','fruits','🫐','توت أزرق','غني بمضادات الأكسدة','8','كغ'),
  ('v1','veggies','🥕','جزر','طازج ومقرمش، غني بالفيتامينات','0.9','كغ'),
  ('v2','veggies','🍅','طماطم','حمراء ناضجة، مثالية للطبخ','1.2','كغ'),
  ('v3','veggies','🥦','بروكلي','خضروات صحية وغذائية','3','كغ'),
  ('v4','veggies','🥑','أفوكادو','ناضج ومثالي، غني بالدهون الصحية','4','حبة'),
  ('v5','veggies','🧅','بصل','طازج، أساسي في كل مطبخ','0.8','كغ'),
  ('v6','veggies','🫑','فلفل ألوان','أحمر، أخضر وأصفر، طازج','2.5','كغ'),
  ('v7','veggies','🥬','خس','أخضر طازج، مثالي للسلطات','0.8','حبة'),
  ('v8','veggies','🥒','خيار','طازج ومنعش، مثالي صيفاً','1','كغ')
ON CONFLICT (id) DO NOTHING;

-- 3. SÉCURITÉ (Row Level Security) -------------------------

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders   ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews  ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Produits : lecture publique, écriture admin seulement
CREATE POLICY "products_public_read"  ON products FOR SELECT USING (true);
CREATE POLICY "products_admin_write"  ON products FOR ALL    USING (auth.role() = 'authenticated');

-- Commandes : n'importe qui peut envoyer, seul admin peut lire/modifier
CREATE POLICY "orders_public_insert"  ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "orders_admin_all"      ON orders FOR ALL    USING (auth.role() = 'authenticated');

-- Avis : lecture + écriture publiques, suppression admin seulement
CREATE POLICY "reviews_public_read"   ON reviews FOR SELECT USING (true);
CREATE POLICY "reviews_public_insert" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "reviews_admin_delete"  ON reviews FOR DELETE USING (auth.role() = 'authenticated');

-- Paramètres : lecture publique, écriture admin seulement
CREATE POLICY "settings_public_read"  ON settings FOR SELECT USING (true);
CREATE POLICY "settings_admin_write"  ON settings FOR ALL    USING (auth.role() = 'authenticated');
