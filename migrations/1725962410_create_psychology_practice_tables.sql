-- Migration to create tables for psychology practice content management
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt VARCHAR(500),
    language VARCHAR(2) NOT NULL DEFAULT 'tr',
    status VARCHAR(20) NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    language VARCHAR(2) NOT NULL DEFAULT 'tr',
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    language VARCHAR(2) NOT NULL DEFAULT 'tr',
    order_num INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_language ON blog_posts(language);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_services_language ON services(language);
CREATE INDEX idx_faqs_language ON faqs(language);
CREATE INDEX idx_faqs_order ON faqs(order_num);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);

-- Insert sample data
INSERT INTO blog_posts (title, content, excerpt, language, status) VALUES
('Anksiyete ile Başa Çıkma Yolları', 'Anksiyete günlük yaşamımızı etkileyen önemli bir durumdur. Bu yazıda anksiyete ile başa çıkma yollarını ele alacağız...', 'Anksiyete ile başa çıkmak için pratik yöntemler', 'tr', 'published'),
('Dealing with Anxiety', 'Anxiety is a significant condition that affects our daily lives. In this article, we will explore ways to cope with anxiety...', 'Practical methods for coping with anxiety', 'en', 'published'),
('Şema Terapi Nedir?', 'Şema Terapi, kişilik bozuklukları ve kronik durumlar için geliştirilmiş etkili bir terapi yaklaşımıdır...', 'Şema terapinin temel prensipleri ve faydaları', 'tr', 'draft');

INSERT INTO services (name, description, language, is_active) VALUES
('Bireysel Terapi', 'Yetişkinler için bireysel psikolojik destek ve terapi hizmetleri. Anksiyete, depresyon, stres yönetimi ve kişisel gelişim alanlarında profesyonel destek.', 'tr', true),
('Individual Therapy', 'Individual psychological support and therapy services for adults. Professional support in areas of anxiety, depression, stress management and personal development.', 'en', true),
('Şema Terapi', 'Kişilik bozuklukları ve kronik psikolojik sorunlar için özelleşmiş şema terapi yaklaşımı.', 'tr', true),
('Schema Therapy', 'Specialized schema therapy approach for personality disorders and chronic psychological problems.', 'en', true);

INSERT INTO faqs (question, answer, language, order_num, is_active) VALUES
('Seans süresi ne kadar?', 'Her bir terapi seansı 50 dakika sürmektedir.', 'tr', 1, true),
('How long is each session?', 'Each therapy session lasts 50 minutes.', 'en', 1, true),
('Online görüşme nasıl yapılıyor?', 'Online görüşmeler Google Meet üzerinden gerçekleşmektedir. Link WhatsApp üzerinden paylaşılmaktadır.', 'tr', 2, true),
('How are online sessions conducted?', 'Online sessions are conducted via Google Meet. The link is shared through WhatsApp.', 'en', 2, true),
('Ödeme nasıl yapılır?', 'Ödeme havale yoluyla veya ofiste elden yapılabilmektedir.', 'tr', 3, true),
('How can I make payment?', 'Payment can be made by bank transfer or in person at the office.', 'en', 3, true);

INSERT INTO contact_submissions (name, email, phone, message, status) VALUES
('Ahmet Yılmaz', 'ahmet@email.com', '05321234567', 'Merhaba, terapi hakkında bilgi almak istiyorum.', 'new'),
('Sarah Johnson', 'sarah@email.com', '05369876543', 'I would like to schedule an appointment for therapy sessions.', 'responded'),
('Melek Özkan', 'melek@email.com', '05451234567', 'Anksiyete sorunu yaşıyorum, yardıma ihtiyacım var.', 'new');
