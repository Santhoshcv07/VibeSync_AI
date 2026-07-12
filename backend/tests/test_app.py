import unittest
from app.main import app

class TestAppImport(unittest.TestCase):
    def test_app_created(self):
        self.assertIsNotNone(app)
        self.assertEqual(app.title, "VibeSync AI API")
        self.assertIsInstance(app.version, str)
        
    def _get_all_routes(self, routes):
        all_routes = []
        for r in routes:
            if hasattr(r, "original_router"):
                all_routes.extend(self._get_all_routes(r.original_router.routes))
            elif hasattr(r, "routes"):
                all_routes.extend(self._get_all_routes(r.routes))
            else:
                all_routes.append(r)
        return all_routes

    def test_health_route_registered_once(self):
        all_routes = self._get_all_routes(app.routes)
        health_routes = [r for r in all_routes if getattr(r, "path", "") == "/health"]
        self.assertEqual(len(health_routes), 1)
        self.assertEqual(health_routes[0].methods, {"GET"})
        
    def test_no_api_v1_registered(self):
        all_routes = self._get_all_routes(app.routes)
        api_routes = [r for r in all_routes if "/api/v1" in getattr(r, "path", "")]
        self.assertEqual(len(api_routes), 0)
        
    def test_no_database_dependencies(self):
        # Very simple check: ensure no sqlalchemy or prisma in modules
        import sys
        self.assertNotIn("sqlalchemy", sys.modules)
        self.assertNotIn("prisma", sys.modules)
        
if __name__ == "__main__":
    unittest.main()
