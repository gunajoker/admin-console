# Zulope Admin Console

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Build for production

```bash
npm run build
```

This compiles TypeScript and generates optimized static files in the `dist/` folder.

### Preview the production build

```bash
npm run preview
```

This starts a local server to preview the production build before deploying.

### Deploy

After building, deploy the contents of the `dist/` folder to any static hosting service (e.g., Netlify, Vercel, AWS S3, GitHub Pages, or your own web server).

For example, using a simple static server:

```bash
npx serve dist
```

### Deploy on AWS EC2 with Nginx

#### 1. Connect to your EC2 instance

```bash
ssh -i your-key.pem ec2-user@your-ec2-public-ip
```

#### 2. Install Git, Node.js, and Nginx

```bash
sudo dnf update -y
sudo dnf install -y git nginx

# Install Node.js 20 via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

#### 3. Clone the repo and build on EC2

```bash
# On EC2
cd ~/apps
git clone https://github.com/gunajoker/admin-console.git
cd admin-console
npm install
npm run build
```

Fix permissions so Nginx can serve the files:

```bash
chmod 711 /home/ec2-user
chmod 711 /home/ec2-user/apps
chmod 711 /home/ec2-user/apps/admin-console
chmod -R 755 /home/ec2-user/apps/admin-console/dist
```

#### 4. Configure Nginx

Create a config file:

```bash
sudo vi /etc/nginx/conf.d/admin-console.conf
```

Add the following (HTTP only — Certbot will add SSL automatically):

```nginx
server {
    listen 80;
    server_name admin.zulope.com;

    root /home/ec2-user/apps/admin-console/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

> The `try_files` directive ensures client-side routing works correctly by falling back to `index.html`.

#### 5. Start Nginx

```bash
sudo nginx -t              # Test config
sudo systemctl start nginx
sudo systemctl enable nginx # Auto-start on boot
```

#### 6. Set up SSL certificate with Let's Encrypt

```bash
sudo dnf install -y certbot python3-certbot-nginx
sudo certbot --nginx -d admin.zulope.com
```

Certbot will automatically:

- Add the HTTPS server block with SSL certificate paths
- Redirect HTTP to HTTPS
- Set up auto-renewal

#### 7. Open ports in EC2 Security Group

In the AWS Console, add inbound rules to your EC2 security group:

| Type  | Protocol | Port | Source    |
| ----- | -------- | ---- | --------- |
| HTTP  | TCP      | 80   | 0.0.0.0/0 |
| HTTPS | TCP      | 443  | 0.0.0.0/0 |

Your app will be accessible at `https://admin.zulope.com`.
