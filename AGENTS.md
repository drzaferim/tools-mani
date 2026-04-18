# AGENTS.md — tools-mani

Bu dosya, projede çalışan tüm AI ajanları (Claude Code, Codex CLI, Antigravity, claude.ai/code) için ortak bağlamdır. **Her ajan çalışmaya başlamadan önce bu dosyayı okumalıdır.**

## Proje

- **Stack:** Next.js + TypeScript + Firebase (web) — önceden EarnMoneyClaude
- **GitHub:** https://github.com/drzaferim/tools-mani
- **Sahibi:** Zafer (drzaferim)

## Çalışma akışı

1. **Her oturum başında:** `git pull` — başka bir ajan veya cihazdan değişiklik gelmiş olabilir
2. **Her mantıklı değişiklikte:** küçük commit at; "günün özeti" tek commit değil
3. **Her oturum sonunda:** `git push` — GitHub her zaman en güncel halini bilsin

## Branch isimlendirme

Paralel ajanların çakışmaması için her ajan kendi prefix'ini kullanır:

| Prefix | Kim |
|---|---|
| `claude/` | Claude Code (yerel veya claude.ai) |
| `codex/` | Codex CLI veya ChatGPT Codex |
| `antigravity/` | Antigravity |
| `zafer/` | Zafer'in kendi manuel çalışması |
| `main` | Stable, sadece merge ile güncellenir |

Örnek: `claude/login-bug-fix`, `codex/refactor-api`

## Commit mesaj stili

- Türkçe veya İngilizce — proje içinde **tutarlı** kal
- Format: `<tip>: <kısa özet>` (örn: `fix: login butonu mobilde çalışmıyordu`)
- Tipler: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`, `style`

## Ajan rolleri (maksimum verim)

| Ajan | En iyi olduğu iş |
|---|---|
| **Claude Code** (yerel) | Büyük refactor, birden çok dosya, karmaşık mantık |
| **Codex CLI** | Nokta atışı fix, test yazma, hızlı düzeltme |
| **Antigravity** | UI/UX tasarım, görsel mockup |
| **claude.ai/code** (mobil) | Yolda/asenkron PR istekleri |

Bir işi birden fazla ajana aynı anda verme. Commit etmeden ajan değiştirme.

## Başlamadan önce kontrol

- `git status` temiz mi? (kirli ise önce commit)
- `git pull` yapıldı mı?
- Uygun branch'te misin? (main'e doğrudan commit atma, PR ile merge et)

## Dikkat

- Sırlar (`.env`, keyler) **asla** commit edilmez — zaten `.gitignore`'da
- `main` branch'e doğrudan push yerine PR tercih et (mobil inceleme için uygun)
