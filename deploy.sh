#!/bin/bash
echo "🚀 DevOps Deploy boshlandi..."
git add .
git commit -m "Auto-deploy: $(date)"
git push origin main-project
echo "✅ Kod GitHub-ga uchdi. ArgoCD 30 soniya ichida yangilaydi."
