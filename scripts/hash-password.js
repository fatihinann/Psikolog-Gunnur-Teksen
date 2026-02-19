import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
  console.log('Kullanım: node scripts/hash-password.js "your_password"');
  process.exit(1);
}

const saltRounds = 12;
const hashedPassword = bcrypt.hashSync(password, saltRounds);

console.log('\n=== ŞİFRE HASH ARAÇI ===');
console.log(`Orijinal şifre: ${password}`);
console.log(`Hash'lenmiş şifre: ${hashedPassword}`);
console.log('\n.env.local dosyasına ekleyin:');
console.log(`ADMIN_PASSWORD_HASH=${hashedPassword}`);
console.log('\n=== === === === === ===\n');
